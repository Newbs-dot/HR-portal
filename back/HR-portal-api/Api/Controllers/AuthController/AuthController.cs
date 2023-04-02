using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers.AuthController;

[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost("/login")]
    public async Task<IActionResult> Login()
    {
        return Ok();
    }
    
    [HttpPost("/check")]
    public async Task<IActionResult> Check()
    {
        return Ok();
    }

    [HttpGet("/logout")]
    public async Task<IActionResult> Logout()
    {
        return Ok();
    }
}