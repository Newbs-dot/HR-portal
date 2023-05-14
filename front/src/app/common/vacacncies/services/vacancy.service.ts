import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { Observable } from 'rxjs';
import { IVacancy } from '../interfaces';

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
        return this.http.get<IVacancy>(`${ this.apiUrl }/vacancy/id?id=${id}`);
    }
}