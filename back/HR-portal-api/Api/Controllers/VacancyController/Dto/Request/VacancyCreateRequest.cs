using Dal.Models;

namespace HR_portal_api.Controllers.VacancyController.Dto;

public class VacancyCreateRequest : TokenModel
{
    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public long DepartamentId { get; set; }
    
    public string VacancyRequrements { get; set; }
    
    public string Vacancyconditions { get; set; }

    public string Name { get; set; }
}