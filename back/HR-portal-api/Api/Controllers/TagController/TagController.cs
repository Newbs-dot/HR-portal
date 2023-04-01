using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers.TagController;

[ApiController]
[Route("tag")]
public class TagController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateTag()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetTags()
    {
        return Ok();
    }

    [HttpGet("id")]
    public async Task<IActionResult> GetTag(int id)
    {
        return Ok();
    }

    [HttpPut("id")]
    public async Task<IActionResult> UpdateTag(int id)
    {
        return Ok();
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteTag(int id)
    {
        return Ok();
    }
}