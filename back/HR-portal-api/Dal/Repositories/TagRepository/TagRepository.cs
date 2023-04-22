using Dal.Models;
using Dal.Repositories.BaseRepository;

namespace Dal.Repositories.TagRepository;

public class TagRepository : BaseRepository<Tag>, ITagRepository
{
    public TagRepository(DataContext context) : base(context)
    {
    }
}