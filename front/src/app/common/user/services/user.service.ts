import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { Observable } from 'rxjs';
import { IUpdateUser, IUser } from '../interfaces';
import { Tokens } from '../../enums';

@Injectable()
export class UserService {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getById(id: number): Observable<IUser> {
        return this.http.get<IUser>(`${ this.apiUrl }/user/id?id=${ id }`);
    }

    public getCurrentUser(): Observable<IUser> {
        const refreshToken: string | null = localStorage.getItem(Tokens.RefreshToken);
        const accessToken: string | null = localStorage.getItem(Tokens.AccessToken);

        return this.http.post<any>(`${ this.apiUrl }/user/current`, { accessToken, refreshToken });
    }

    public updateUser(model: IUpdateUser): Observable<IUser> {
        const refreshToken: string | null = localStorage.getItem(Tokens.RefreshToken);
        const accessToken: string | null = localStorage.getItem(Tokens.AccessToken);

        return this.http.post<any>(`${ this.apiUrl }/user/update/current`, { accessToken, refreshToken, ...model });
    }
}
