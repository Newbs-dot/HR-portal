import { IDepartament } from '../../departaments';
import { IUser } from '../../user';
import { ITag } from '../../tag';

export interface IVacancy {
    id: number;

    experience: string;

    salary: number;

    description: string;

    departament: IDepartament;

    isActive: boolean;

    name: string;

    createdBy: IUser;

    respondedUsers: IUser[];

    tags: ITag[];

    vacancyRequrements: string;

    vacancyconditions: string;
}