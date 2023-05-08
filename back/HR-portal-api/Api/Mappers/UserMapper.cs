using Dal.Models;
using HR_portal_api.Controllers.UserController.Dto.Response;

namespace HR_portal_api.Mappers;

public static class UserMapper
{
    public static UserResponse GetUserResponse(this User user, IEnumerable<string> roles) =>
        new()
        {
            Roles = roles,
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            MiddleName = user.MiddleName,
            Email = user.Email,
            EmailConfirmed = user.EmailConfirmed,
            PhoneNumber = user.PhoneNumber,
            PhoneNumberConfirmed = user.PhoneNumberConfirmed
        };
}