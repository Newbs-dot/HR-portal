using Dal.Models;

namespace HR_portal_api.Controllers.UserController.Dto.Request;

public class UpdateUserRequest : TokenModel
{
    public string? Phone { get; set; }

    public string? FullName { get; set; }
}