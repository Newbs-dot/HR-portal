export interface IUser {
    id: number;
    userFullName: string;
    roles: string[];
    departamentId: number;
    email: string;
    experience: string;
    salary: string;
    description: string;
    phoneNumber: string;
    //tags: ITag[];
    isActive: boolean;
}
