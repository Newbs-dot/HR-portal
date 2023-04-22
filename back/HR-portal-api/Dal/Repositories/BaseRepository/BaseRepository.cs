using Dal.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dal.Repositories.BaseRepository;

public class BaseRepository<T> : IBaseRepository<T> where T : class, IBaseModel
{
    protected readonly DbContext DbContext;

    protected DbSet<T> DbSet => DbContext.Set<T>();

    public BaseRepository(DataContext context)
    {
        DbContext = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await DbSet.ToListAsync();

    public async Task<T?> FindWithPredicateAsync(Func<T, bool> predicate) => await DbSet.FirstOrDefaultAsync(x => predicate(x));

    public async Task<T?> FindAsync(int id) => await DbSet.FindAsync(id);

    public async Task CreateAsync(T item)
    {
        await DbSet.AddAsync(item);
        await DbContext.SaveChangesAsync();
    }

    public async Task<T> UpdateAsync(T item)
    {
        var model = DbSet.Update(item).Entity;
        await DbContext.SaveChangesAsync();

        return model;
    }

    public async Task DeleteAsync(int id)
    {
        var item = await FindAsync(id);

        if (item == null)
            return;

        DbSet.Remove(item);
        await DbContext.SaveChangesAsync();
    }
}