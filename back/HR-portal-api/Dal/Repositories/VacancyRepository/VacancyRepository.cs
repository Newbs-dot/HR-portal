using Dal.Models;
using Dal.Repositories.BaseRepository;
using Dal.Repositories.VacancyRepository.Interfaces;

namespace Dal.Repositories.VacancyRepository;

public class VacancyRepository : BaseRepository<Vacancy>, IVacancyRepository
{
    public VacancyRepository(DataContext context) : base(context)
    {
    }
}