namespace Logic.Services.TagService;

public interface ITagService
{
    Task AddTagToVacancy(long vacancyId, long[] tagIdList);

    Task AddTagToSummary(long summaryId, long[] tagIdList);
}