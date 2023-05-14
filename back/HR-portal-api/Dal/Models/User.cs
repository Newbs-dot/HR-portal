using Dal.Models.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Dal.Models;

public class User : IdentityUser<long>, IBaseModel
{
    public string FullName { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenExpiryTime { get; set; }
}