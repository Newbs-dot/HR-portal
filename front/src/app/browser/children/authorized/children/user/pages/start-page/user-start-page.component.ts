import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {
  DepartamentService,
  IUser,
  UserService, VacancyService
} from '../../../../../../../common';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    templateUrl: './user-start-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-start-page.component.scss'],
    providers: [
        UserService
    ]
})
export class UserStartPageComponent{
    protected readonly profile$: Observable<IUser>;
    constructor(
    protected userService: UserService,
    protected cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    )
    {
        this.profile$ = userService.getById(1);
    }
    protected onEditProfileClick(): void {
        this._router.navigate([`/cabinet/resume-creation`], { relativeTo: this._activatedRoute });
    }

}
