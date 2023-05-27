import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {
  AuthService,
  ISummary, IUser,
  IVacancy,
  SummaryService,
  UserService,
  VacancyService
} from '../../../../../../../../../common';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
@Component({
    templateUrl: './user-profile-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-profile-info.component.scss'],
    providers: [
        UserService,
        SummaryService,
        AuthService
    ],
})
export class UserProfileInfoComponent {
    protected readonly summary$: Observable<ISummary | undefined>;
    protected readonly user$: Observable<IUser>;
    constructor(
    protected summaryService: SummaryService,
    protected userService: UserService,
    protected cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    ) {
        this.summary$ = summaryService.getCurrentRespondedSummary()
        this.user$ = userService.getCurrentUser()
    }
}
