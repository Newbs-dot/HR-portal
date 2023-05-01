using Dal.Models;
using Dal.Repositories.TagRepository;
using HR_portal_api.Controllers.SummaryController.Dto.Request;
using HR_portal_api.Controllers.TagController.Dto;
using HR_portal_api.Policy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HR_portal_api.Controllers.TagController;

[ApiController]
[Route("tag")]
public class TagController : ControllerBase
{
    private readonly ITagRepository _tagRepository;

    public TagController(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    [HttpPost]
    [Authorize(Policy = PolicyConstants.DepartmentsHeadWithAdministrator)]
    public async Task<IActionResult> CreateTag([FromBody] CreateTagRequest request)
    {
        var description = request.Description;
        var name = request.Name;

        if (name == null || description == null)
            return BadRequest("Invalid request data");

        await _tagRepository.CreateAsync(new Tag { Description = description, Name = name });

        return Ok();
    }

    [HttpGet]
    public async Task<List<Tag>> GetTags()
    {
        return (await _tagRepository.GetAllAsync()).ToList();
    }

    [HttpGet("id")]
    public async Task<ActionResult<Tag?>> GetTag(int id)
    {
        var tag = await _tagRepository.FindAsync(id);

        if (tag == null)
            return BadRequest("invalid tag id");

        return tag;
    }

    [HttpPut("id")]
    [Authorize(Policy = PolicyConstants.DepartmentsHeadWithAdministrator)]
    public async Task<IActionResult> UpdateTag(int id, [FromBody] UpdateTagRequest request)
    {
        var tag = await _tagRepository.FindAsync(id);

        if (tag == null)
            return BadRequest("invalid summary id");

        tag.Description = request.Description ?? tag.Description;
        tag.Name = request.Name ?? tag.Name;

        await _tagRepository.UpdateAsync(tag);

        return Ok();
    }

    [HttpDelete("id")]
    [Authorize(Policy = PolicyConstants.DepartmentsHeadWithAdministrator)]
    public async Task<IActionResult> DeleteTag(int id)
    {
        try
        {
            var tag = await _tagRepository.FindAsync(id);

            if (tag == null)
                return BadRequest("invalid tag id");

            await _tagRepository.DeleteAsync(id);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest("invalid tag id");
        }
    }
}