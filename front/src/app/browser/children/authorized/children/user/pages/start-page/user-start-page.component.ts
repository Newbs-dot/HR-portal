import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import {
    DepartamentService,
    IUser,
    UserService, VacancyService
} from '../../../../../../../common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: './user-start-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-start-page.component.scss'],
    providers: [
        UserService
    ]
})
export class UserStartPageComponent {

    protected selectedIndex: number = 2;

    protected tabs: string[] = ['Рассмотренные вакансии', 'Редактировать профиль', 'Профиль']

    protected readonly profile$: Observable<IUser>;

    constructor(
        protected userService: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.profile$ = userService.getById(1);
    }

    public onTabClick(index: number): void {
        this.selectedIndex = index;
    }

}
