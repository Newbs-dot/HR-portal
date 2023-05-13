import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryDevidePipe } from '../../../../../common';

@Component({
    selector: 'app-vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe],
    standalone: true,
})
export class VacancyComponent {

    @Input()
    public id!: string;

    @Input()
    public departamentName!: string;

    @Input()
    public name!: string;

    @Input()
    public salaryFrom!: string;

    @Input()
    public salaryTo!: string;

    @Input()
    public description!: string;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onRespondClick(): void {
        this._router.navigate([`./auth`], { relativeTo: this._activatedRoute });
    }

    protected onDetailClick(): void {
        this._router.navigate([`./vacancies/${ this.id }`], { relativeTo: this._activatedRoute });
    }

    protected onLikeClick(): void {
        this._router.navigate([`./auth`], { relativeTo: this._activatedRoute });
    }
}