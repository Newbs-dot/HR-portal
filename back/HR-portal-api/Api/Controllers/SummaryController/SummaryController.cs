using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers.SummaryController;

[ApiController]
[Route("summary")]
public class SummaryController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateSummary()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetSummaries()
    {
        return Ok();
    }

    [HttpGet("id")]
    public async Task<IActionResult> GetSummary(int id)
    {
        return Ok();
    }

    [HttpPut("id")]
    public async Task<IActionResult> UpdateSummary(int id)
    {
        return Ok();
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteSummary(int id)
    {
        return Ok();
    }
}