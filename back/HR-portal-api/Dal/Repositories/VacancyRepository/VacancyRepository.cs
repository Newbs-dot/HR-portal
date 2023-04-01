using Dal.Models;
using Dal.Repositories.VacancyRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dal.Repositories.VacancyRepository;

public class VacancyRepository : BaseRepository<Vacancy>, IVacancyRepository
{
    public VacancyRepository(DbContext context) : base(context)
    {
    }
}