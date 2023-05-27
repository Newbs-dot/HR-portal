import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

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
    public isWhiteTeheme: boolean = true;

    @Input()
    public showLogin: boolean = true;
    @Input()
    public isAuthorized: boolean = false;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onVacancyButtonClick(): void {
        if (this.isAuthorized) {
            this._router.navigate([`cabinet/vacancies`]);
        } else {
            this._router.navigate([`/vacancies`], { relativeTo: this._activatedRoute });
        }

    }

    protected onHomeButtonClick(): void {
        if (this.isAuthorized) {
            this._router.navigate([`cabinet/main`]);
        } else {
            this._router.navigate([`/main`], { relativeTo: this._activatedRoute });
        }

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
