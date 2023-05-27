import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { Observable } from 'rxjs';
import { IVacancy } from '../interfaces';
import { Tokens } from '../../enums';

@Injectable()
export class VacancyService {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getAll(): Observable<IVacancy[]> {
        return this.http.get<IVacancy[]>(`${ this.apiUrl }/vacancy`);
    }

    public getById(id: number): Observable<IVacancy> {
        return this.http.get<IVacancy>(`${ this.apiUrl }/vacancy/id?id=${ id }`);
    }

    public respondToVacancy(id: number): Observable<void> {
        const refreshToken: string | null = localStorage.getItem(Tokens.RefreshToken);
        const accessToken: string | null = localStorage.getItem(Tokens.AccessToken);

        return this.http.post<any>(`${ this.apiUrl }/vacancy/respond/id?id=${ id }`, { accessToken, refreshToken });
    }

    public getCurrentRespondedVacancies(): Observable<IVacancy[]> {
        const refreshToken: string | null = localStorage.getItem(Tokens.RefreshToken);
        const accessToken: string | null = localStorage.getItem(Tokens.AccessToken);

        return this.http.post<IVacancy[]>(`${ this.apiUrl }/vacancy/current/responded`, { accessToken, refreshToken });
    }
}