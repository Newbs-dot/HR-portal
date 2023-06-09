import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CURRENT_ROLE_URL } from '../../../common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./styles/header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf
    ]
})
export class HeaderComponent {

    @Input()
    public showDepartament: boolean = false;

    @Input()
    public showVacancies: boolean = true;

    @Input()
    public departamentElement?: ElementRef;

    @Input()
    public isWhiteLogo: boolean = true;

    /**
     * Авторизован ли пользователь
     * @returns {boolean}
     */
    public get isAuth(): boolean {
        return !!this.currentRoleUrl;
    }

    constructor(
        @Inject(CURRENT_ROLE_URL) protected currentRoleUrl: string,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onVacancyButtonClick(): void {
        this._router.navigate([`${ this.currentRoleUrl }/vacancies`]);
    }

    protected onHomeButtonClick(): void {
        this._router.navigate([`${ this.currentRoleUrl }/main`]);
    }

    protected onDepartamentsButtonClick(): void {
        if (this.departamentElement) {
            const { top }: DOMRect = this.departamentElement.nativeElement.getBoundingClientRect();
            window.scrollTo({ top });
        }
    }

    protected onLoginButtonClick(): void {
        this._router.navigate([`/auth/login`], { relativeTo: this._activatedRoute });
    }

    protected onRegisterButtonClick(): void {
        this._router.navigate([`/auth/reg`], { relativeTo: this._activatedRoute });
    }

    protected onProfileButtonClick(): void {
        this._router.navigate([`/cabinet/profile`], { relativeTo: this._activatedRoute });
    }
}
