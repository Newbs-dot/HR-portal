using Dal;
using Dal.Models;
using HR_portal_api.Controllers.UserController.Dto.Request;
using HR_portal_api.Controllers.UserController.Dto.Response;
using HR_portal_api.Mappers;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HR_portal_api.Controllers.UserController;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    private readonly JwtSettings _jwtSettings;

    public UserController(UserManager<User> userManager, DataContext context, IOptions<JwtSettings> options)
    {
        _userManager = userManager;
        _context = context;
        _jwtSettings = options.Value;
    }

    [HttpPost("current")]
    public async Task<ActionResult<UserResponse>> GetCurrentUser([FromBody] GetCurrentUserRequest request)
    {
        if (request.AccessToken == null)
            return BadRequest("Invalid client request");

        var principal = _jwtSettings.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);

        return await GetResponse(user);
    }

    [HttpGet]
    public async Task<IEnumerable<UserResponse>> GetUsers()
    {
        return _context.Users.ToList().Select(x => GetResponse(x).Result);
    }

    [HttpGet("id")]
    public async Task<ActionResult<UserResponse>> GetUser(long id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
            return BadRequest("invalid user id");

        return await GetResponse(user);
    }

    private async Task<UserResponse> GetResponse(User user)
    {
        var roles = await _userManager.GetRolesAsync(user);

        return user.GetUserResponse(roles);
    }
}