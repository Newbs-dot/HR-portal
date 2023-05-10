import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { IAuthResponse, ILoginRequest, IRegiseterRequest } from '../dto';
import { API_URL, LOGOUT_EVENT } from '../tokens';
import { IBadResponse } from '../dto/response/bad-response.interface';
import { AuthModel } from '../models';

@Injectable()
export class AuthService {

    private readonly _accessToken: string = 'access-token';

    private readonly _refreshToken: string = 'refresh-token';

    constructor(
        protected http: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
        @Inject(LOGOUT_EVENT) protected readonly logoutEvent$: Subject<void>,
    ) {
        this.logoutEvent$.subscribe(this.logout)
    }

    public login(model: ILoginRequest): Observable<AuthModel | IBadResponse> {
        return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, model)
            .pipe(
                map((response: IAuthResponse) => new AuthModel(response)),
                tap((value: AuthModel) => {
                    localStorage.setItem(this._accessToken, value.token);
                    localStorage.setItem(this._refreshToken, value.refreshToken);
                }),
                catchError(() =>
                    of({
                        message: 'Неправильный логин или пароль'
                    })
                )
            );
    }

    public register(model: IRegiseterRequest): Observable<AuthModel | IBadResponse> {
        return this.http.post<IAuthResponse>(`${ this.apiUrl }/register`, model)
            .pipe(
                map((response: IAuthResponse) => new AuthModel(response)),
                tap((value: AuthModel) => {
                    localStorage.setItem(this._accessToken, value.token);
                    localStorage.setItem(this._refreshToken, value.refreshToken);
                }),
                catchError(() =>
                    of({
                        message: 'Пользователь с таким емейлом уже зарегестрирован'
                    })
                )
            );
    }

    public refresh(): Observable<AuthModel | boolean> {
        if (!this.isAuthorized()) {
            this.logout();

            return of(false);
        }
        const refreshToken: string | null = localStorage.getItem(this._refreshToken);
        const accessToken: string | null = localStorage.getItem(this._accessToken);

        return this.http.post<IAuthResponse>(`${ this.apiUrl }/refresh`, {
            accessToken,
            refreshToken
        }).pipe(
            map((response: IAuthResponse) => new AuthModel(response)),
            tap((value: AuthModel) => {
                localStorage.setItem(this._accessToken, value.token);
                localStorage.setItem(this._refreshToken, value.refreshToken);
            }),
            catchError(() => {
                this.logout();

                return of(false);
            })
        );
    }

    public isAuthorized(): boolean {
        const refreshToken: string | null = localStorage.getItem(this._refreshToken);
        const accessToken: string | null = localStorage.getItem(this._accessToken);

        return !!refreshToken && !!accessToken;
    }

    public logout(): void {
        localStorage.clear();
    }

}