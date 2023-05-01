using System.ComponentModel.DataAnnotations.Schema;
using Dal.Models.Interfaces;

namespace Dal.Models;

public class Summary : IBaseModel
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public string File { get; set; }

    public bool IsActive { get; set; }

    public List<Tag?>? Tags { get; set; }

    [ForeignKey("User")] public long UserId { get; set; }

    public User User { get; set; }
}