import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DepartamentService, IVacancy, VacancyService} from '../../../../../../../../../common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './user-profiler-responded.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        VacancyService
    ],
    styleUrls: ['./styles/user-profile-responded.component.scss'],
})
export class UserProfilerRespondedComponent {
    protected readonly vacancies$: Observable<IVacancy[]>;
  constructor(
    protected vacancyService: VacancyService,
    protected cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    ) {
        this.vacancies$ = vacancyService.getCurrentRespondedVacancies()
    }
}
