using Dal.Models;
using Microsoft.AspNetCore.Identity;

namespace Logic.Services.TokenService;

public interface ITokenService
{
    string CreateToken(User user, IEnumerable<IdentityRole<long>> role);
}