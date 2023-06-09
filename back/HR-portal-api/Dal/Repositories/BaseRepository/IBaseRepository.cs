﻿namespace Dal.Repositories.BaseRepository;

public interface IBaseRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> FindWithPredicateAsync(Func<T, bool> predicate);
    
    Task<T?> FindAsync(long id);

    Task CreateAsync(T item);

    Task<T> UpdateAsync(T item);

    Task DeleteAsync(long id);
}