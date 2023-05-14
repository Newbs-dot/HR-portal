import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCompetentsOfTags, ITag, SalaryDevidePipe } from '../../../../../common';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe, NgForOf],
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
    public salary!: string;

    @Input()
    public description!: string;

    @Input()
    public tags!: ITag[];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    public getCompetents(tags: ITag[]): ITag[] {
        return getCompetentsOfTags(tags);
    }

    protected onRespondClick(): void {
        this._router.navigate([`/auth`], { relativeTo: this._activatedRoute });
    }

    protected onDetailClick(): void {
        this._router.navigate([`/vacancies/${ this.id }`], { relativeTo: this._activatedRoute });
    }

    protected onLikeClick(): void {
        this._router.navigate([`/auth`], { relativeTo: this._activatedRoute });
    }
}
