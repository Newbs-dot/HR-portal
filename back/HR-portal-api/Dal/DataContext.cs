using Microsoft.EntityFrameworkCore;

namespace Dal;

public class Contract
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class DataContext : DbContext
{
    public DbSet<Contract> Contracts { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
}