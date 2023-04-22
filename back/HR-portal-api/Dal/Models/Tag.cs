using Dal.Models.Interfaces;

namespace Dal.Models;

public class Tag : IBaseModel
{
    public long Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}