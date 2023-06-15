import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { AuthService, CURRENT_ROLE_URL, DestroyService, SummaryService, UserService } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-head-profile',
    templateUrl: './head-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-profile.component.scss'],
    providers: [
        SummaryService,
        DestroyService,
        UserService,
        AuthService
    ],
    imports: [
        NgIf
    ],
    standalone: true
})
export class HeadProfileComponent {
    @Input()
    public fullName?: string;
    @Input()
    public phone?: string;
    @Input()
    public email?: string;

    constructor(
        @Inject(CURRENT_ROLE_URL) protected currentRoleUrl: string,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        protected authService: AuthService,
    ) {

    }

    protected onLogoutButtonClick(): void {
        this._router.navigate([`/main`]);
        this.authService.logout()
    }
}
