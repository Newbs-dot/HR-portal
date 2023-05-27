import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
    AuthService,
    ISummary, IUser,
    SummaryService,
    UserService
} from '../../../../../../../../../common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './head-profile-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-profile-info.component.scss'],
    providers: [
        UserService,
        AuthService
    ],
})
export class HeadProfileInfoComponent {
    protected readonly user$: Observable<IUser>;

    constructor(
        protected userService: UserService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.user$ = userService.getCurrentUser()
    }

}


