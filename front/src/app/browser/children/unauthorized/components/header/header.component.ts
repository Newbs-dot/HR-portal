import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class HeaderComponent {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onVacancyButtonClick(): void {
        this._router.navigate([`./vacancies`], { relativeTo: this._activatedRoute });
    }

    protected onDepartamentsButtonClick(): void {
        this._router.navigate([`./departaments`], { relativeTo: this._activatedRoute });
    }

    protected onLoginButtonClick(): void {
        this._router.navigate([`./auth/login`], { relativeTo: this._activatedRoute });
    }

    protected onRegisterButtonClick(): void {
        this._router.navigate([`./auth/reg`], { relativeTo: this._activatedRoute });
    }

}
