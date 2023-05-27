import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IVacancy, UserService, VacancyService } from '../../../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './created-vacancies-head.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        VacancyService,
        UserService
    ],
    styleUrls: ['./styles/user-profile-responded.component.scss'],
})
export class CreatedVacanciesHeadComponent {
    protected readonly vacancies$: Observable<IVacancy[]>;

    constructor(
        protected vacancyService: VacancyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.vacancies$ = vacancyService.getCurrentCreatedVacancies()
    }
}
