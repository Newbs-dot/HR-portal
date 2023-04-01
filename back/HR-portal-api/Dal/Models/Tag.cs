using Dal.Models.Interfaces;

namespace Dal.Models;

public class Tag : IBaseModel
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}