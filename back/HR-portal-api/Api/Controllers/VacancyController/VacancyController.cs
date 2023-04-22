using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers.VacancyController;

[ApiController]
[Route("vacancy")]
public class VacancyController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateVacancies()
    {
        return Ok();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetVacancies()
    {
        return Ok();
    }

    [HttpGet("id")]
    public async Task<IActionResult> GetVacancy(int id)
    {
        return Ok();
    }

    [HttpPut("id")]
    public async Task<IActionResult> UpdateVacancy(int id)
    {
        return Ok();
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteVacancy(int id)
    {
        return Ok();
    }
}