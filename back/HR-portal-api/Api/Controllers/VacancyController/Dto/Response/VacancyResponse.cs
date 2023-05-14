using Dal.Models;
using HR_portal_api.Controllers.TagController.Dto.Response;
using HR_portal_api.Controllers.UserController.Dto.Response;

namespace HR_portal_api.Controllers.VacancyController.Dto.Response;

public class VacancyResponse
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public Departament Departament { get; set; }

    public bool IsActive { get; set; }

    public string Name { get; set; }
    
    public string VacancyRequrements { get; set; }
    
    public string Vacancyconditions { get; set; }

    public UserResponse CreatedBy { get; set; }

    public List<UserResponse> RespondedUsers { get; set; }

    public List<TagResponse> Tags { get; set; }
}