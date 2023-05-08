using Dal.Models.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Dal.Models;

public class User : IdentityUser<long>, IBaseModel
{
    public string? FirstName { get; set; } = null!;

    public string? LastName { get; set; } = null!;

    public string? MiddleName { get; set; } = null!;

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenExpiryTime { get; set; }
}