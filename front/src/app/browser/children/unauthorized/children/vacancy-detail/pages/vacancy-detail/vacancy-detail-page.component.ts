import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getCompetentsOfTags, getTagsOfTags, ITag, IVacancy, TagType, VacancyService } from '../../../../../../../common';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PreviousRouteService } from '../../../../../../../common/previous-route-service/previous-route.service';

@Component({
    selector: 'app-vacancy-detail',
    templateUrl: './vacancy-detail-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['/styles/vacancy-detail-component.scss'],
    providers: [
        VacancyService
    ]
})
export class VacancyDetailPageComponent {

    protected readonly vacancy$: Observable<IVacancy>;

    constructor(
        protected readonly vacancyService: VacancyService,
        protected readonly previousRouteService: PreviousRouteService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        window.scrollTo({ top: 0 });
        this.vacancy$ = this._activatedRoute.paramMap
            .pipe(
                switchMap((value: any) => {
                    const id: number = +value.params['id'];

                    return this.vacancyService.getById(id)
                }),
            );
    }

    public onReturnButtonClick(): void {
        const previousUrl: string = this.previousRouteService.getPreviousUrl() ?? '/main';
        console.log(previousUrl);
        this._router.navigate([`/${ previousUrl }`], { relativeTo: this._activatedRoute });
    }

    public onButtonClick(): void {
        this._router.navigate(['/auth'], { relativeTo: this._activatedRoute });
    }

    protected splitConditions(conditions: string): string[] {
        return conditions.split('•').filter((s: string) => s !== '');
    }

    protected getCompetentsOfTags(tags: ITag[]): ITag[] {
        return getCompetentsOfTags(tags);
    }

    protected getTagsOfTags(tags: ITag[]): ITag[] {
        return getTagsOfTags(tags);
    }

}
