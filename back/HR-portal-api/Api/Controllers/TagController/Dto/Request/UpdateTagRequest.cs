namespace HR_portal_api.Controllers.SummaryController.Dto.Request;

public class UpdateTagRequest
{
    public string? Name { get; set; } = null;

    public string? Description { get; set; } = null;
    
    public List<long>? VacancyIdList { get; set; } = null;
    
    public List<long>? SummaryIdList { get; set; } = null;
}