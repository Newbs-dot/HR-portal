using System.ComponentModel.DataAnnotations.Schema;
using Dal.Models.Interfaces;

namespace Dal.Models;

public class Tag : IBaseModel
{
    public long Id { get; set; }

    public string Type { get; set; }
    
    public List<long>? VacancyIdList { get; set; } = null;

    public List<long>? SummaryIdList { get; set; } = null;

    public string Name { get; set; }

    public string Description { get; set; }
}