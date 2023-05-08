using Dal.Models;
using Dal.Repositories.BaseRepository;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Dal.Repositories.TagRepository;

public class TagRepository : BaseRepository<Tag>, ITagRepository
{
    public TagRepository(DataContext context) : base(context)
    {
    }
}