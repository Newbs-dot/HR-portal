import { IUser } from '../../user';
import { ITag } from '../../tag';

export interface ISummary {
    id: number;

    experience: string;

    salary: number;

    file: string;

    description: string;

    isActive: boolean;

    name: string;

    createdBy: IUser;

    tags: ITag[];
}