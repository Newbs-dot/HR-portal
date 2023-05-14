using Dal.Models.Interfaces;

namespace Dal.Models;

public class Vacancy : IBaseModel
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public bool IsActive { get; set; }

    public string Name { get; set; }

    public long CreatedBy { get; set; }

    public long DepartamentId { get; set; }

    public string VacancyRequrements { get; set; }
    
    public string Vacancyconditions { get; set; }

    public List<long>? RespondedUsers { get; set; } = null;
}