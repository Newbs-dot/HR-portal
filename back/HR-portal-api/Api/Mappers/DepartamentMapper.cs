using Dal.Models;
using HR_portal_api.Controllers.DepartamentController.Dto.Response;

namespace HR_portal_api.Mappers;

public static class DepartamentMapper
{
    public static DepartamentResponse GetDepartamentResponse(this Departament departament) =>
        new()
        {
            HeadFullName = departament.HeadFullName,
            Description = departament.Description,
            Id = departament.Id,
            DepartamentName = departament.DepartamentName,
            DepartamentReview = departament.DepartamentReview,
        };
}