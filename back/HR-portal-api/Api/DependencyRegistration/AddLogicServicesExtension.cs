using Logic.Services.TagService;
using Logic.Services.TokenService;

namespace HR_portal_api.DependencyRegistration;

public static class AddLogicServicesExtension
{
    public static void AddLogicServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ITagService, TagService>();
    }
}