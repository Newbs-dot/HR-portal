using Dal.Models;
using Dal.Repositories.DepartamentRepository;
using Dal.Repositories.TagRepository;
using Dal.Repositories.VacancyRepository;
using HR_portal_api.Controllers.TagController.Dto;
using HR_portal_api.Controllers.VacancyController.Dto;
using HR_portal_api.Controllers.VacancyController.Dto.Request;
using HR_portal_api.Controllers.VacancyController.Dto.Response;
using HR_portal_api.Mappers;
using HR_portal_api.Policy;
using Logic.Extensions;
using Logic.Services.TagService;
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

    private readonly ITagService _tagService;

    private readonly ITagRepository _tagRepository;

    private readonly IDepartamentRepository _departamentRepository;

    private readonly JwtSettings _jwtSettings;

    public VacancyController(IVacancyRepository vacancyRepository, IOptions<JwtSettings> options,
        UserManager<User> userManager, ITagService tagService, ITagRepository tagRepository,
        IDepartamentRepository departamentRepository)
    {
        _vacancyRepository = vacancyRepository;
        _userManager = userManager;
        _tagService = tagService;
        _tagRepository = tagRepository;
        _departamentRepository = departamentRepository;
        _jwtSettings = options.Value;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVacancy([FromBody] VacancyCreateRequest request)
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
            DepartamentId = request.DepartamentId,
            Vacancyconditions = request.Vacancyconditions,
            VacancyRequrements = request.VacancyRequrements,
            IsActive = false,
            Name = request.Name,
            Salary = request.Salary,
            CreatedBy = user.Id,
            RespondedUsers = null
        };
        await _vacancyRepository.CreateAsync(vacancy);

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<VacancyResponse>>> GetVacancies()
    {
        var users = _userManager.Users.ToList();

        return (await _vacancyRepository.GetAllAsync()).Select(v => GetResponse(v, users).Result).ToList();
    }

    [HttpPost("current/created")]
    public async Task<ActionResult<List<VacancyResponse>>> GetCurrentVacanciesCreated(
        [FromBody] GetVacancyCurrentRequest request)
    {
        if (request.AccessToken == null)
            return BadRequest("Invalid client request");

        var principal = _jwtSettings.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var users = _userManager.Users.ToList();
        var user = await _userManager.FindByNameAsync(username!);
        var vacancies = await _vacancyRepository.GetAllAsync();

        return vacancies
            .Where(v => v.CreatedBy == user.Id)
            .Select(v => GetResponse(v, users).Result)
            .ToList();
    }

    [HttpPost("current/responded")]
    public async Task<ActionResult<List<VacancyResponse>>> GetCurrentVacanciesResponded(
        [FromBody] GetVacancyCurrentRequest request)
    {
        if (request.AccessToken == null)
            return BadRequest("Invalid client request");

        var principal = _jwtSettings.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);
        var vacancies = await _vacancyRepository.GetAllAsync();
        var users = _userManager.Users.ToList();

        return vacancies
            .Where(v => v.RespondedUsers != null && v.RespondedUsers.Any(userId => userId == user.Id))
            .Select(v => GetResponse(v, users).Result)
            .ToList();
    }

    [HttpPost("respond/id")]
    public async Task<IActionResult> RespondToVacancy(long id, [FromBody] RespondToVacancyRequest request)
    {
        if (request.AccessToken == null)
            return BadRequest("Invalid client request");

        var principal = _jwtSettings.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal == null)
            return BadRequest("Invalid access token or refresh token");

        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid vacancy id");

        if (vacancy.RespondedUsers == null)
            vacancy.RespondedUsers = new List<long>();

        if (vacancy.RespondedUsers.Any(userId => userId == user!.Id))
            return BadRequest("vacancy is already responded by this user");

        vacancy.RespondedUsers.Add(user!.Id);
        await _vacancyRepository.UpdateAsync(vacancy);

        return Ok();
    }

    [HttpPost("tag/id")]
    public async Task<IActionResult> UpdateTags(long id, [FromBody] AddTagsRequest request)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid vacancy id");

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
    public async Task<ActionResult<VacancyResponse?>> GetVacancy(long id)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);
        var users = _userManager.Users.ToList();

        if (vacancy == null)
            return BadRequest("invalid summary id");

        return await GetResponse(vacancy, users);
    }

    [HttpPost("selected/id")]
    public async Task<IActionResult> UpdateVacancy(long id, [FromBody] UpdateVacancyRequest request)
    {
        var vacancy = await _vacancyRepository.FindAsync(id);

        if (vacancy == null)
            return BadRequest("invalid summary id");

        vacancy.Experience = request?.Experience ?? vacancy.Experience;
        vacancy.Description = request?.Description ?? vacancy.Description;
        vacancy.DepartamentId = request?.DepartamentId ?? vacancy.DepartamentId;
        vacancy.IsActive = request?.IsActive ?? vacancy.IsActive;
        vacancy.Salary = request?.Salary ?? vacancy.Salary;
        vacancy.Name = request?.Name ?? vacancy.Name;
        vacancy.Vacancyconditions = request?.Vacancyconditions ?? vacancy.Vacancyconditions;
        vacancy.VacancyRequrements = request?.VacancyRequrements ?? vacancy.VacancyRequrements;

        await _vacancyRepository.UpdateAsync(vacancy);

        return Ok();
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteVacancy(long id)
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

    private async Task<VacancyResponse> GetResponse(Vacancy vacancy, IReadOnlyCollection<User> users)
    {
        var tags = (await _tagRepository.GetAllAsync())
            .Where(t => t.VacancyIdList != null && t.VacancyIdList.Any(vacancyId => vacancyId == vacancy.Id))
            .Select(t => t.GetTagResponse())
            .ToList();
        var createdByUser = users.FirstOrDefault(u => u.Id == vacancy.CreatedBy)!;
        var createdByRole = await _userManager.GetRolesAsync(createdByUser);
        var respondedUsers = users
            .Where(u => vacancy.RespondedUsers != null && vacancy.RespondedUsers.Any(vacancyId => vacancyId == u.Id))
            .Select(user => user.GetUserResponse(_userManager.GetRolesAsync(user).Result))
            .ToList();
        var departament = await _departamentRepository.FindAsync(vacancy.DepartamentId);

        return new VacancyResponse
        {
            Id = vacancy.Id,
            Experience = vacancy.Experience,
            Salary = vacancy.Salary,
            Description = vacancy.Description,
            IsActive = vacancy.IsActive,
            Departament = departament!,
            VacancyRequrements = vacancy.VacancyRequrements,
            Vacancyconditions = vacancy.Vacancyconditions,
            Name = vacancy.Name,
            CreatedBy = createdByUser.GetUserResponse(createdByRole),
            RespondedUsers = respondedUsers,
            Tags = tags
        };
    }
}