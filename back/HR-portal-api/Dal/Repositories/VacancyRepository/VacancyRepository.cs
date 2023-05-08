using Dal.Models;
using Dal.Repositories.BaseRepository;

namespace Dal.Repositories.VacancyRepository;

public class VacancyRepository : BaseRepository<Vacancy>, IVacancyRepository
{
    public VacancyRepository(DataContext context) : base(context)
    {
    }
}