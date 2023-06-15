using Dal.Models;

namespace HR_portal_api.Controllers.SummaryController.Dto.Request;

public class CreateSummaryRequest : TokenModel
{
    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public string? File { get; set; }
}