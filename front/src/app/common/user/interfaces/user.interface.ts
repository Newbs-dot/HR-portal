import { ITag } from '../../tag';

export interface IUser {
    id: number;
    userFullName: string;
    roles: string[];
    //email: string;
    experience : string;
    salary:string;
    description:string;
    phoneNumber: string;
    //tags: ITag[];
    isActive: boolean;
}
