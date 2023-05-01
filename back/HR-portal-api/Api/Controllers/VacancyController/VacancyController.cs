using Dal;
using Dal.Models;
using Dal.Repositories.TagRepository;
using Dal.Repositories.VacancyRepository.Interfaces;
using HR_portal_api.Controllers.TagController.Dto;
using HR_portal_api.Controllers.VacancyController.Dto;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HR_portal_api.Controllers.VacancyController;

[ApiController]
[Route("vacancy")]
public class VacancyController : ControllerBase
{
    private readonly IVacancyRepository _vacancyRepository;

    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    private readonly ITagRepository _tagRepository;

    private readonly JwtSettings _jwtSettings;

    public VacancyController(IVacancyRepository vacancyRepository, IOptions<JwtSettings> options,
        UserManager<User> userManager, DataContext context, ITagRepository tagRepository)
    {
        _vacancyRepository = vacancyRepository;
        _userManager = userManager;
        _context = context;
        _tagRepository = tagRepository;
        _jwtSettings = options.Value;
    }

    [HttpPost]
    [Authorize(Policy = PolicyConstants.AllRoles)]
    public async Task<IActionResult> CreateSummary([FromBody] VacancyCreateRequest request)
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

        var vacancy = new Vacancy
        {
            Description = request.Description,
            Experience = request.Experience,
            DepartamentName = request.DepartamentName,
            IsActive = false,
            Name = request.Name,
            Salary = request.Salary,
            UserId = user.Id,
            User = user
        };
        
        if (user.Vacancies == null)
            user.Vacancies = new List<Vacancy>();

        user.Vacancies.Add(vacancy);
        await _vacancyRepository.CreateAsync(vacancy);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<Vacancy>>> GetSummaries()
    {
        return (await _vacancyRepository.GetAllAsync()).ToList();
    }

    [HttpPost("tag/id")]
    public async Task<ActionResult<Vacancy?>> UpdateTags(int id, [FromBody] AddTagsRequest request)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid summary id");

        if (vacancy.Tags == null)
            vacancy.Tags = new List<Tag?>();

        foreach (var tagId in request.TagIdList)
        {
            var tag = await _tagRepository.FindAsync(tagId);
            vacancy.Tags.Add(tag);
        }

        await _vacancyRepository.UpdateAsync(vacancy);

        return vacancy;
    }

    [HttpGet("id")]
    public async Task<ActionResult<Vacancy?>> GetSummary(int id)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid summary id");

        return vacancy;
    }

    [HttpPost("id")]
    public async Task<IActionResult> UpdateSummary(int id, [FromBody] UpdateVacancyRequest request)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid summary id");

        vacancy.Experience = request.Experience ?? vacancy.Experience;
        vacancy.Description = request.Description ?? vacancy.Description;
        vacancy.DepartamentName = request.DepartamentName ?? vacancy.DepartamentName;
        vacancy.IsActive = request.IsActive ?? vacancy.IsActive;
        vacancy.Salary = request.Salary ?? vacancy.Salary;
        vacancy.Name = request.Name ?? vacancy.Name;

        await _vacancyRepository.UpdateAsync(vacancy);

        return Ok();
    }

    [HttpDelete("id")]
    [Authorize(Policy = PolicyConstants.AllRoles)]
    public async Task<IActionResult> DeleteSummary(long id)
    {
        try
        {
            var vacancy = await _vacancyRepository.FindAsync(id);

            if (vacancy == null)
                return BadRequest("invalid summary id");

            await _vacancyRepository.DeleteAsync(id);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest("invalid summary id");
        }
    }
}