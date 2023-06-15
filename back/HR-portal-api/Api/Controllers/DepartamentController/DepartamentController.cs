using Dal.Repositories.DepartamentRepository;
using HR_portal_api.Controllers.DepartamentController.Dto.Response;
using HR_portal_api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace HR_portal_api.Controllers.DepartamentController;

[ApiController]
[Route("departament")]
public class DepartamentController : ControllerBase
{
    private readonly IDepartamentRepository _departamentRepository;

    public DepartamentController(IDepartamentRepository departamentRepository)
    {
        _departamentRepository = departamentRepository;
    }

    [HttpGet]
    public async Task<List<DepartamentResponse>> GetDepartaments()
    {
        return (await _departamentRepository.GetAllAsync()).Select(d => d.GetDepartamentResponse()).ToList();
    }

    [HttpGet("id")]
    public async Task<ActionResult<DepartamentResponse?>> GetDepartament(int id)
    {
        var departament = await _departamentRepository.FindAsync(id);

        if (departament == null)
            return BadRequest("invalid tag id");

        return departament.GetDepartamentResponse();
    }
}