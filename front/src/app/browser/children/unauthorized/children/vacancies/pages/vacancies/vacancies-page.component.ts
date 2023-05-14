import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IVacancy, VacancyService } from '../../../../../../../common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    templateUrl: './vacancies-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['/styles/vacancies-page-component.scss'],
    providers: [
        VacancyService
    ]
})
export class VacanciesPageComponent {

    public form: FormGroup<{ search: FormControl<string | null> }> = new FormGroup<{ search: FormControl<string | null> }>({
        search: new FormControl<string | null>(''),
    });

    protected readonly vacancies$: Observable<IVacancy[]>;

    constructor(
        protected vacancyService: VacancyService,
    ) {
        window.scrollTo({ top: 0 });
        this.vacancies$ = vacancyService.getAll();
    }

    protected getFilteredVacancies(vacancies: IVacancy[], search: string | null): IVacancy[] {
        return vacancies.filter((vacancy: IVacancy) => !search || vacancy.name.toLowerCase().includes(search.toLowerCase()));
    }

}
