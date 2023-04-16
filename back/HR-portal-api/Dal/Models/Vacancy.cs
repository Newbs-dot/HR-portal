using Dal.Models.Interfaces;

namespace Dal.Models;

public class Vacancy : IBaseModel
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public string DepartamentName { get; set; }

    public bool IsActive { get; set; }

    public string Name { get; set; }

    public List<Tag> Tags { get; set; }
}