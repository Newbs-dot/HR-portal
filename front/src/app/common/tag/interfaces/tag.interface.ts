import { TagType } from '../enums/tag-type.enum';

export interface ITag {
    id: number;
    name: string;
    type: TagType;
    description: string;
}