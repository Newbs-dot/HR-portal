using Dal.Models;
using Dal.Repositories.BaseRepository;

namespace Dal.Repositories.DepartamentRepository;

public class DepartamentRepository : BaseRepository<Departament>, IDepartamentRepository
{
    public DepartamentRepository(DataContext context) : base(context)
    {
    }
}