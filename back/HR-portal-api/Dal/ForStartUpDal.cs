using Dal.Repositories.SummaryRepository;
using Dal.Repositories.SummaryRepository.Interfaces;
using Dal.Repositories.TagRepository;
using Dal.Repositories.TagsRepository.Interfaces;
using Dal.Repositories.VacancyRepository;
using Dal.Repositories.VacancyRepository.Interfaces;
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

        services.AddTransient<ISummaryRepository, SummaryRepository>();
        services.AddTransient<ITagRepository, TagRepository>();
        services.AddTransient<IVacancyRepository, VacancyRepository>();

        return services;
    }
}