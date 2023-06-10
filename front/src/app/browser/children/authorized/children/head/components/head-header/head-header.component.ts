import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CURRENT_ROLE_URL } from '../../../../../../../common';

@Component({
    selector: ' app-user-header',
    templateUrl: './head-header.component.html',
    styleUrls: ['./styles/header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf
    ],

})
export class HeadHeaderComponent {

    @Input()
    public showDepartament: boolean = false;

    @Input()
    public departamentElement?: ElementRef;

    @Input()
    public isWhiteLogo: boolean = true;

    constructor(
        @Inject(CURRENT_ROLE_URL) protected currentRoleUrl: string,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onVacancyButtonClick(): void {
        this._router.navigate([`cabinet/head/vacancies`]);
    }

    protected onHomeButtonClick(): void {
        this._router.navigate([`cabinet/head/main`]);
    }

    protected onProfileButtonClick(): void {
        this._router.navigate([`/cabinet/head/profile`]);
    }

    protected onVacancyCreateClick(): void {
        this._router.navigate([`/cabinet/head/vacancy-creation`]);
    }

    protected onResumeButtonClick(): void {
        this._router.navigate([`/cabinet/head/summeries`]);
    }
}
