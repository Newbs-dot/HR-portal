// using Dal.Models;
// using Dal.Repositories.UserRepository;
// using Logic.Models;
// using Logic.Services.TokenService;
// using Logic.Settings;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.Extensions.Options;
//
// namespace Logic.Services.AuthService;
//
// public class AuthService : IAuthService
// {
//     private readonly JwtSettings _jwtSettings;
//
//     private readonly ITokenService _tokenService;
//
//     private readonly IUserRepository _userRepository;
//
//     private readonly UserManager<User> _userManager;
//
//     public AuthService(IOptions<JwtSettings> options, ITokenService tokenService, IUserRepository userRepository,
//         UserManager<User> userManager)
//     {
//         _tokenService = tokenService;
//         _userRepository = userRepository;
//         _userManager = userManager;
//         _jwtSettings = options.Value;
//     }
//
//     public async Task<AuthModel> Register()
//     {
//         return null;
//     }
//
//     public async Task<AuthModel> Login(string email, string password)
//     {
//         
//     }
// }