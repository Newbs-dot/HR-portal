using Dal.Models;
using Dal.Repositories.TagsRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dal.Repositories.TagRepository;

public class TagRepository : BaseRepository<Tag>, ITagRepository
{
    public TagRepository(DbContext context) : base(context)
    {
    }
}