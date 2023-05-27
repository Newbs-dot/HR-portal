import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable()
export class UserService {

    constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }
    public getById(id: number): Observable<IUser> {
        return this.http.get<IUser>(`${ this.apiUrl }/user/id?id=${id}`);
    }
}
