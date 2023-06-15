import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { getCompetentsOfTags, ITag, SalaryDevidePipe } from '../../../../../../../common';

@Component({
    selector: 'app-vacancy',
    templateUrl: './head-vacancy.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe, NgForOf, NgStyle, NgIf, AsyncPipe],
    standalone: true,
})
export class HeadVacancyComponent {

    @Input()
    public buttonName: string = 'Подробнее';

    @Input()
    public showRespondButton: boolean = true;

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

    protected onDetailClick(): void {
        this._router.navigate([`cabinet/head/vacancies/${ this.id }`]);
    }
}
