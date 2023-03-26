using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public static class ForStartUpDal
{
    public static IServiceCollection AddDalService(this IServiceCollection services, string? connectionString)
    {
        services.AddScoped<DbContext, DataContext>();
        services.AddDbContext<DataContext>(options =>
            options.UseNpgsql(connectionString, o => o.MigrationsAssembly("Dal")), ServiceLifetime.Transient);
        using var provider = services.BuildServiceProvider();
        var service = provider.GetRequiredService<DbContext>();
        if (service.Database.GetPendingMigrations().Any())
            service.Database.Migrate();

        return services;
    }
}