namespace HR_portal_api.Controllers.SummaryController.Dto.Request;

public class UpdateSummaryRequest
{
    public string? Experience { get; set; } = null;

    public int? Salary { get; set; } = null;

    public string? Description { get; set; } = null;

    public string? File { get; set; } = null;
    
    public bool? IsActive { get; set; } = null;
}