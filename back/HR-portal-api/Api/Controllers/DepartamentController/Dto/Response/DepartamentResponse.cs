using Dal.Models;

namespace HR_portal_api.Controllers.DepartamentController.Dto.Response;

public class DepartamentResponse
{
    public long Id { get; set; }

    public string DepartamentName { get; set; }
    
    public string DepartamentReview { get; set; }
    
    public string Description { get; set; }

    public string HeadFullName { get; set; }

    public List<Vacancy> VacanciesId { get; set; }
}