using Dal.Models;
using Dal.Repositories.SummaryRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dal.Repositories.SummaryRepository;

public class SummaryRepository : BaseRepository<Summary>, ISummaryRepository
{
    public SummaryRepository(DbContext context) : base(context)
    {
    }
}