using Dal;
using Dal.Models;
using Dal.Repositories.SummaryRepository;
using Dal.Repositories.TagRepository;
using HR_portal_api.Controllers.SummaryController.Dto.Request;
using HR_portal_api.Controllers.TagController.Dto;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HR_portal_api.Controllers.SummaryController;

[ApiController]
[Route("summary")]
public class SummaryController : ControllerBase
{
    private readonly ISummaryRepository _summaryRepository;

    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    private readonly ITagRepository _tagRepository;

    private readonly JwtSettings _jwtSettings;

    public SummaryController(ISummaryRepository summaryRepository, IOptions<JwtSettings> options,
        UserManager<User> userManager, DataContext context, ITagRepository tagRepository)
    {
        _summaryRepository = summaryRepository;
        _userManager = userManager;
        _context = context;
        _tagRepository = tagRepository;
        _jwtSettings = options.Value;
    }

    [HttpPost]
    [Authorize(Policy = PolicyConstants.AllRoles)]
    public async Task<IActionResult> CreateSummary([FromBody] CreateSummaryRequest request)
    {
        if (request.AccessToken == null)
            return BadRequest("Invalid client request");

        var principal = _jwtSettings.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);

        if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            return BadRequest("Invalid access token or refresh token");

        var summary = new Summary
        {
            Description = request.Description,
            Experience = request.Experience,
            File = request.File,
            IsActive = false,
            Salary = request.Salary,
            UserId = user.Id,
            User = user
        };
        user.Summary = summary;
        await _summaryRepository.CreateAsync(summary);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<Summary>>> GetSummaries()
    {
        return (await _summaryRepository.GetAllAsync()).ToList();
    }

    [HttpPost("tag/id")]
    public async Task<ActionResult<Summary?>> UpdateTags(int id, [FromBody] AddTagsRequest request)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        if (summary.Tags == null)
            summary.Tags = new List<Tag?>();

        foreach (var tagId in request.TagIdList)
        {
            var tag = await _tagRepository.FindAsync(tagId);
            summary.Tags.Add(tag);
        }
        await _summaryRepository.UpdateAsync(summary);

        return summary;
    }

    [HttpGet("id")]
    public async Task<ActionResult<Summary?>> GetSummary(int id)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        return summary;
    }

    [HttpPost("id")]
    public async Task<IActionResult> UpdateSummary(int id, [FromBody] UpdateSummaryRequest request)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        summary.Description = request.Description ?? summary.Description;
        summary.Experience = request.Experience ?? summary.Experience;
        summary.Salary = request.Salary ?? summary.Salary;
        summary.File = request.File ?? summary.File;

        await _summaryRepository.UpdateAsync(summary);

        return Ok();
    }


    [HttpDelete("id")]
    [Authorize(Policy = PolicyConstants.AllRoles)]
    public async Task<IActionResult> DeleteSummary(long id)
    {
        try
        {
            var summary = await _summaryRepository.FindAsync(id);

            if (summary == null)
                return BadRequest("invalid summary id");

            await _summaryRepository.DeleteAsync(id);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest("invalid summary id");
        }
    }
}