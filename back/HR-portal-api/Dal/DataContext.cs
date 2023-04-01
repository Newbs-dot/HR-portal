using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal;

public class DataContext : DbContext
{
    public DbSet<Tag> Tags { get; set; }

    public DbSet<Summary> Summaries { get; set; }

    public DbSet<Vacancy> Vacancies { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Summary>()
            .HasMany<Tag>(s => s.Tags);
        
        modelBuilder.Entity<Vacancy>()
            .HasMany<Tag>(v => v.Tags);
    }
}