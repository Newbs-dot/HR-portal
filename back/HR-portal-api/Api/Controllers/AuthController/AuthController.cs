using System.IdentityModel.Tokens.Jwt;
using Core.Controllers.AuthController.Dto.Request;
using Dal;
using Dal.Constants;
using Dal.Models;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Models;
using Logic.Services.TokenService;
using Logic.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HR_portal_api.Controllers.AuthController;

[ApiController]
public class AuthController : ControllerBase
{
    private readonly JwtSettings _jwtSettings;

    private readonly ITokenService _tokenService;

    private readonly DataContext _context;

    private readonly UserManager<User> _userManager;

    public AuthController(IOptions<JwtSettings> options, ITokenService tokenService, DataContext context,
        UserManager<User> userManager)
    {
        _tokenService = tokenService;
        _context = context;
        _userManager = userManager;
        _jwtSettings = options.Value;
    }

    [HttpPost("/register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(request);

        var user = new User
        {
            Email = request.Email,
            UserName = request.Email
        };
        var result = await _userManager.CreateAsync(user, request.Password);

        foreach (var error in result.Errors)
            ModelState.AddModelError(string.Empty, error.Description);

        if (!result.Succeeded)
            return BadRequest(request);

        var findUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

        if (findUser == null)
            throw new Exception($"User {request.Email} not found");

        await _userManager.AddToRoleAsync(findUser, RoleConstants.User);

        return await Authenticate(new AuthRequest
        {
            Email = request.Email,
            Password = request.Password,
        });
    }


    [HttpPost("/login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var managedUser = await _userManager.FindByEmailAsync(request.Email);

        if (managedUser == null)
            return BadRequest("Bad credentials");

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);

        if (!isPasswordValid)
            return BadRequest("Bad credentials");

        var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

        if (user is null)
            return Unauthorized();

        var roleIds = await _context.UserRoles
            .Where(r => r.UserId == user.Id)
            .Select(x => x.RoleId)
            .ToListAsync();
        var roles = _context.Roles
            .Where(x => roleIds.Contains(x.Id))
            .ToList();

        var accessToken = _tokenService.CreateToken(user, roles);
        user.RefreshToken = _jwtSettings.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenValidityInDays);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Email = user.Email!,
            Token = accessToken,
            RefreshToken = user.RefreshToken
        });
    }

    [HttpPost("/refresh")]
    public async Task<ActionResult<AuthResponse>> Check(TokenModel? tokenModel)
    {
        if (tokenModel is null)
            return BadRequest("Invalid client request");

        var accessToken = tokenModel.AccessToken;
        var refreshToken = tokenModel.RefreshToken;
        var principal = _jwtSettings.GetPrincipalFromExpiredToken(accessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            return BadRequest("Invalid access token or refresh token");

        var newAccessToken = _jwtSettings.CreateToken(principal.Claims.ToList());
        var newRefreshToken = _jwtSettings.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _userManager.UpdateAsync(user);

        return Ok(new AuthResponse
        {
            Email = user.Email!,
            Token = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
            RefreshToken = newRefreshToken
        });
    }
}