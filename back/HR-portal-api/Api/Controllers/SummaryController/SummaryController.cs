using Dal;
using Dal.Models;
using Dal.Repositories.SummaryRepository;
using Dal.Repositories.TagRepository;
using HR_portal_api.Controllers.SummaryController.Dto.Request;
using HR_portal_api.Controllers.SummaryController.Dto.Response;
using HR_portal_api.Controllers.TagController.Dto;
using HR_portal_api.Mappers;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Services.TagService;
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

    private readonly ITagService _tagService;

    private readonly ITagRepository _tagRepository;

    private readonly JwtSettings _jwtSettings;

    public SummaryController(ISummaryRepository summaryRepository, IOptions<JwtSettings> options,
        UserManager<User> userManager, DataContext context, ITagService tagService, ITagRepository tagRepository)
    {
        _summaryRepository = summaryRepository;
        _userManager = userManager;
        _context = context;
        _tagService = tagService;
        _tagRepository = tagRepository;
        _jwtSettings = options.Value;
    }

    [HttpPost]
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
            CreatedBy = user.Id,
        };
        await _summaryRepository.CreateAsync(summary);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<SummaryResponse>>> GetSummaries()
    {
        return (await _summaryRepository.GetAllAsync()).Select(x => GetResponse(x).Result).ToList();
    }

    [HttpPost("tag/id")]
    public async Task<IActionResult> UpdateTags(long id, [FromBody] AddTagsRequest request)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        try
        {
            await _tagService.AddTagToSummary(id, request.TagIdList);
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest("Invalid tag id");
        }
    }

    [HttpGet("id")]
    public async Task<ActionResult<SummaryResponse?>> GetSummary(long id)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        return await GetResponse(summary);
    }

    [HttpPost("id")]
    public async Task<IActionResult> UpdateSummary(long id, [FromBody] UpdateSummaryRequest request)
    {
        var summary = await _summaryRepository.FindAsync(id);

        if (summary == null)
            return BadRequest("invalid summary id");

        summary.Description = request?.Description ?? summary.Description;
        summary.Experience = request?.Experience ?? summary.Experience;
        summary.Salary = request?.Salary ?? summary.Salary;
        summary.File = request?.File ?? summary.File;
        summary.IsActive = request?.IsActive ?? summary.IsActive;

        await _summaryRepository.UpdateAsync(summary);

        return Ok();
    }


    [HttpDelete("id")]
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

    private async Task<SummaryResponse> GetResponse(Summary summary)
    {
        var tags = (await _tagRepository.GetAllAsync())
            .Where(t => t.SummaryIdList != null && t.SummaryIdList.Any(summaryId => summaryId == summary.Id))
            .Select(t => t.GetTagResponse())
            .ToList();
        var user = _userManager.Users.FirstOrDefault(u => u.Id == summary.CreatedBy)!;
        var userRoles = await _userManager.GetRolesAsync(user);

        return new SummaryResponse
        {
            Id = summary.Id,
            Experience = summary.Experience,
            Salary = summary.Salary,
            Description = summary.Description,
            File = summary.File,
            IsActive = summary.IsActive,
            CreatedBy = user.GetUserResponse(userRoles),
            Tags = tags
        };
    }
}