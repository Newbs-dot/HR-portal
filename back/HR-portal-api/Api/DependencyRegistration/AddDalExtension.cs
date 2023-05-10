using Dal;
using Dal.Models;
using Dal.Repositories.SummaryRepository;
using Dal.Repositories.TagRepository;
using Dal.Repositories.VacancyRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HR_portal_api.DependencyRegistration;

public static class AddDalExtension
{
    public static void AddDalDependencies(this IServiceCollection services, string? connectionString)
    {
        services.AddDbContext<DataContext>(opt => opt.UseNpgsql(connectionString,
            o => o.MigrationsAssembly("Dal")));

        services.AddIdentity<User, IdentityRole<long>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddUserManager<UserManager<User>>()
            .AddSignInManager<SignInManager<User>>();

        services.AddTransient<ISummaryRepository, SummaryRepository>();
        services.AddTransient<ITagRepository, TagRepository>();
        services.AddTransient<IVacancyRepository, VacancyRepository>();
    }
}