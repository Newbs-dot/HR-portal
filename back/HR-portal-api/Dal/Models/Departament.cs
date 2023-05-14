using Dal.Models.Interfaces;

namespace Dal.Models;

public class Departament : IBaseModel
{
    public long Id { get; set; }

    public string DepartamentName { get; set; }
    
    public string DepartamentReview { get; set; }

    public string Description { get; set; }

    public string HeadFullName { get; set; }
}