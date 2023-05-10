using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Logic.Settings;

public class JwtSettings
{
    public const string Jwt = nameof(Jwt);

    public int Expire { get; set; }

    public string Secret { get; set; }

    public string Issuer { get; set; }

    public string Audience { get; set; }

    public int TokenValidityInMinutes { get; set; }
    
    public int RefreshTokenValidityInDays { get; set; }

    public SymmetricSecurityKey AuthSigningKey => new(Encoding.UTF8.GetBytes(Secret));
}