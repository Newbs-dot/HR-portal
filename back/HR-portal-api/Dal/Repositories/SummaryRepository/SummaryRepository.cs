using Dal.Models;
using Dal.Repositories.BaseRepository;

namespace Dal.Repositories.SummaryRepository;

public class SummaryRepository : BaseRepository<Summary>, ISummaryRepository
{
    public SummaryRepository(DataContext context) : base(context)
    {
    }
}