using Dal.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Dal;

public class DataContext : IdentityDbContext<User, IdentityRole<long>, long>
{
    public DbSet<Tag> Tags { get; set; }

    public DbSet<Summary> Summaries { get; set; }

    public DbSet<Vacancy> Vacancies { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        Database.Migrate();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Summary>()
            .HasMany<Tag>(s => s.Tags);

        modelBuilder.Entity<Vacancy>()
            .HasMany<Tag>(v => v.Tags);

        modelBuilder.Entity<User>()
            .HasOne<Summary>(u => u.Summary)
            .WithOne(s => s.User);
        
        modelBuilder.Entity<User>()
            .HasMany<Vacancy>(u => u.Vacancies)
            .WithOne(v => v.User);
    }
}