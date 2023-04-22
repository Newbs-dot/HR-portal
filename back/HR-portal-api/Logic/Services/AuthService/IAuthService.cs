using Logic.Models;

namespace Logic.Services.AuthService;

public interface IAuthService
{
    Task<AuthModel> Register();
    
    Task<AuthModel> Login(string email, string password);
}