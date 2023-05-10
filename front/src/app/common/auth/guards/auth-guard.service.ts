import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../services';
import { map, Observable, Subject, tap } from 'rxjs';
import { AuthModel } from '../models';
import { LOGOUT_EVENT } from '../tokens';

@Injectable()
export class AuthenticatorGuardService implements CanActivate {
    constructor(
        protected authService: AuthService,
        protected router: Router,
        @Inject(LOGOUT_EVENT) protected readonly logoutEvent$: Subject<void>,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const role: string = route.data['role'];

        return this.authService.refresh()
            .pipe(
                map((response: AuthModel | boolean) => {
                    if (typeof response === 'boolean') {
                        return false;
                    }
                    return response.role.includes(role) && role.length === response.role.length;
                }),
                tap((isOpen: boolean) => {
                    if (!isOpen) {
                        this.router.navigate(['']);
                        this.logoutEvent$.next();
                    }
                })
            );
    }
}