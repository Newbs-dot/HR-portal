using Dal.Models;
using HR_portal_api.Controllers.TagController.Dto.Response;
using HR_portal_api.Controllers.UserController.Dto.Response;

namespace HR_portal_api.Controllers.SummaryController.Dto.Response;

public class SummaryResponse
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public string File { get; set; }

    public bool IsActive { get; set; }

    public UserResponse CreatedBy { get; set; }

    public List<TagResponse> Tags { get; set; }
}