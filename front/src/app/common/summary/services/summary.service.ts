import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tokens } from '../../enums';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth';
import { ISummary } from '../interfaces/summary.interface';

@Injectable()
export class SummaryService {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getCurrentRespondedSummary(): Observable<ISummary | undefined> {
        const refreshToken: string | null = localStorage.getItem(Tokens.RefreshToken);
        const accessToken: string | null = localStorage.getItem(Tokens.AccessToken);

        return this.http.post<ISummary | undefined>(`${ this.apiUrl }/summary/current/responded`, { accessToken, refreshToken });
    }

}