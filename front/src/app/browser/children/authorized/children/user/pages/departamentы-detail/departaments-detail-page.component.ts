import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { DepartamentService, IDepartament, IVacancy, VacancyService } from '../../../../../../../common';

@Component({
    templateUrl: './departaments-detail-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/departaments-page-component.scss'],
    providers: [
        DepartamentService,
        VacancyService
    ]
})
export class DepartamentsDetailPageComponent {

    protected readonly departament$: Observable<IDepartament>;

    protected readonly vacancies$: Observable<IVacancy[]>

    constructor(
        protected departamentService: DepartamentService,
        protected vacanciesService: VacancyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        window.scrollTo({ top: 0 });
        this.departament$ = this._activatedRoute.paramMap
            .pipe(
                switchMap((value: any) => {
                    const id: number = +value.params['id'];

                    return this.departamentService.getById(id)
                }),
            );
        this.vacancies$ = this._activatedRoute.paramMap
            .pipe(
                switchMap((value: any) => {
                    const id: number = +value.params['id'];

                    return this.departamentService.getById(id)
                }),
                switchMap((departament: IDepartament) => this.vacanciesService.getAll()
                    .pipe(
                        map((vacancies: IVacancy[]) => vacancies.filter((vacancy: IVacancy) => vacancy.departament.id === departament.id))
                    ))
            );
    }

    protected onFindJobClick(): void {
        this._router.navigate([`cabinet/vacancies`]);
    }

    protected onFindAllJobs(): void {
        this._router.navigate([`cabinet/vacancies`]);
    }
}