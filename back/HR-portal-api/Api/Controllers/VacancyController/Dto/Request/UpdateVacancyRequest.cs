namespace HR_portal_api.Controllers.VacancyController.Dto;

public class UpdateVacancyRequest
{
    public string? Experience { get; set; } = null;

    public int? Salary { get; set; } = null;

    public string? Description { get; set; } = null;

    public string? DepartamentName { get; set; } = null;

    public bool? IsActive { get; set; } = null;

    public string? Name { get; set; } = null;
}