using Dal.Models.Interfaces;

namespace Dal.Repositories.Interfaces;

public interface IBaseRepository<T> where T : IBaseModel
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> FindAsync(int id);

    Task CreateAsync(T item);

    Task<T> UpdateAsync(T item);

    Task DeleteAsync(int id);
}