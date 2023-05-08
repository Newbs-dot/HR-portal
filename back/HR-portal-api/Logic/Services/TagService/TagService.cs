using Dal.Repositories.TagRepository;

namespace Logic.Services.TagService;

public class TagService : ITagService
{
    private readonly ITagRepository _tagRepository;

    public TagService(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    public async Task AddTagToVacancy(long vacancyId, long[] tagIdList)
    {
        foreach (var tagId in tagIdList)
        {
            var tag = await _tagRepository.FindAsync(tagId);

            if (tag.VacancyIdList == null)
                tag.VacancyIdList = new List<long>();

            tag.VacancyIdList.Add(vacancyId);
            await _tagRepository.UpdateAsync(tag);
        }
    }

    public async Task AddTagToSummary(long summaryId, long[] tagIdList)
    {
        foreach (var tagId in tagIdList)
        {
            var tag = await _tagRepository.FindAsync(tagId);

            if (tag.SummaryIdList == null)
                tag.SummaryIdList = new List<long>();

            tag.SummaryIdList.Add(summaryId);
            await _tagRepository.UpdateAsync(tag);
        }
    }
}