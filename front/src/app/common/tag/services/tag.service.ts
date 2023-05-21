import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { Observable } from 'rxjs';
import { IDepartament } from '../../departaments';
import { ITag } from '../interfaces/tag.interface';

@Injectable()
export class TagService {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getAll(): Observable<ITag[]> {
        return this.http.get<ITag[]>(`${ this.apiUrl }/tag`);
    }

}