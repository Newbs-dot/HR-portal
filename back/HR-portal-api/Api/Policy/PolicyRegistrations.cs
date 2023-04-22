using Dal.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace HR_portal_api.Policy;

public static class PolicyRegistrations
{
    public static void AddPolicies(this AuthorizationOptions options)
    {
        options.CreatePolicyWithRoles(PolicyConstants.OnlyUser, new[] { RoleConstants.User });

        options.CreatePolicyWithRoles(PolicyConstants.OnlyAdministrator, new[] { RoleConstants.Administrator });

        options.CreatePolicyWithRoles(PolicyConstants.OnlyDepartmentsHead, new[] { RoleConstants.DepartmentsHead });

        options.CreatePolicyWithRoles(PolicyConstants.DepartmentsHeadWithAdministrator,
            new[] { RoleConstants.DepartmentsHead, RoleConstants.Administrator });

        options.CreatePolicyWithRoles(PolicyConstants.AllRoles,
            new[] { RoleConstants.User, RoleConstants.Administrator, RoleConstants.DepartmentsHead });
    }

    private static void CreatePolicyWithRoles(this AuthorizationOptions options, string policyName, string[] roles) =>
        options.AddPolicy(
            policyName,
            new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireAssertion(x => roles.Any(role => x.User.IsInRole(role)))
                .Build()
        );
}