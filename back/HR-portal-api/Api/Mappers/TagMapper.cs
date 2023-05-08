using Dal.Models;
using HR_portal_api.Controllers.TagController.Dto.Response;

namespace HR_portal_api.Mappers;

public static class TagMapper
{
    public static TagResponse GetTagResponse(this Tag tag) =>
        new()
        {
            Description = tag.Description,
            Name = tag.Name,
            Id = tag.Id
        };
}