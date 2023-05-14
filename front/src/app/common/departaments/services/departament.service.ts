import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartament } from '../interfaces/departament.interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { IVacancy } from '../../vacacncies';

@Injectable()
export class DepartamentService {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getAll(): Observable<IDepartament[]> {
        return this.http.get<IDepartament[]>(`${ this.apiUrl }/departament`);
    }

    public getById(id: number): Observable<IDepartament> {
        return this.http.get<IDepartament>(`${ this.apiUrl }/departament/id?id=${id}`)
    }

}