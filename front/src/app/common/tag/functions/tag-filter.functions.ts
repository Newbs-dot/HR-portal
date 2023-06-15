import { ITag } from '../interfaces/tag.interface';
import { TagType } from '../enums/tag-type.enum';

export function getTagsOfTags(tags: ITag[]): ITag[] {
    return tags.filter((t: ITag) => t.type === TagType.Tag);
}

export function getCompetentsOfTags(tags: ITag[]): ITag[] {
    return tags.filter((t: ITag) => t.type === TagType.Competents);
}