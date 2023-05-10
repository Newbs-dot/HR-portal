namespace Logic.Models;

public class AuthModel
{
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
    
    public string RefreshToken { get; set; } = null!;
}