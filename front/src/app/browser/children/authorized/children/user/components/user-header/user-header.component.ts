import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CURRENT_ROLE_URL } from '../../../../../../../common';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./styles/header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf
    ]
})
export class UserHeaderComponent {

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

    protected onProfileButtonClick(): void {
        this._router.navigate([`/cabinet/profile`], { relativeTo: this._activatedRoute });
    }

    protected onResumeButtonClick(): void {
        this._router.navigate([`/cabinet/resume-creation`], { relativeTo: this._activatedRoute });
    }
}
