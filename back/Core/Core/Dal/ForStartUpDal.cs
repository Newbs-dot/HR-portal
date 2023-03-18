namespace Dal;
using Microsoft.Extensions.DependencyInjection;

public static class ForStartUpDal
{
    public static IServiceCollection AddDalService(this IServiceCollection services)
    {
        return services;
    }
}