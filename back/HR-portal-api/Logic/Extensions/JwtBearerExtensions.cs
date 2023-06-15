using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Dal.Models;
using Logic.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Logic.Extensions;

public static class JwtBearerExtensions
{
    public static IEnumerable<Claim> CreateClaims(this User user, IEnumerable<IdentityRole<long>> roles)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Role, string.Join(" ", roles.Select(x => x.Name))),
        };
        return claims;
    }

    public static SigningCredentials CreateSigningCredentials(this JwtSettings jwtSettings) =>
        new(jwtSettings.AuthSigningKey, SecurityAlgorithms.HmacSha256);

    public static JwtSecurityToken CreateJwtToken(this IEnumerable<Claim> claims, JwtSettings jwtSettings) =>
        new(
            jwtSettings.Issuer,
            jwtSettings.Audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(jwtSettings.Expire),
            signingCredentials: jwtSettings.CreateSigningCredentials()
        );

    public static JwtSecurityToken CreateToken(this JwtSettings jwtSettings, List<Claim> authClaims) =>
        new(
            issuer: jwtSettings.Issuer,
            audience: jwtSettings.Audience,
            expires: DateTime.Now.AddMinutes(jwtSettings.TokenValidityInMinutes),
            claims: authClaims,
            signingCredentials: new SigningCredentials(jwtSettings.AuthSigningKey, SecurityAlgorithms.HmacSha256)
        );

    public static string GenerateRefreshToken(this JwtSettings jwtSettings)
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        
        return Convert.ToBase64String(randomNumber);
    }

    public static ClaimsPrincipal? GetPrincipalFromExpiredToken(this JwtSettings jwtSettings, string? token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = jwtSettings.AuthSigningKey,
            ValidateLifetime = false,
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
        if (securityToken is not JwtSecurityToken jwtSecurityToken ||
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
            throw new SecurityTokenException("Invalid token");

        return principal;
    }
}