namespace Logic.Models;

public class AuthResponse
{
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
    
    public string RefreshToken { get; set; } = null!;
}