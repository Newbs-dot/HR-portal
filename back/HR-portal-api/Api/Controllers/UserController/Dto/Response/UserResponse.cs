﻿namespace HR_portal_api.Controllers.UserController.Dto.Response;

public class UserResponse
{
    public long Id { get; set; }

    public string? FirstName { get; set; } = null!;

    public string? LastName { get; set; } = null!;

    public string? MiddleName { get; set; } = null!;

    public IEnumerable<string> Roles { get; set; } = null!;

    public string? Email { get; set; } = null!;

    public bool EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; } = null!;

    public bool PhoneNumberConfirmed { get; set; }
}