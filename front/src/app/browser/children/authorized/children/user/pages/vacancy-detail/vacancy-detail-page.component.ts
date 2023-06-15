import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CURRENT_ROLE_URL, getCompetentsOfTags, getTagsOfTags, ITag, IUser, IVacancy, UserService, VacancyService } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { PreviousRouteService } from '../../../../../../../common/previous-route-service/previous-route.service';

@Component({
    selector: 'app-vacancy-detail',
    templateUrl: './vacancy-detail-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['/styles/vacancy-detail-component.scss'],
    providers: [
        VacancyService,
        UserService,
    ]
})
export class VacancyDetailPageComponent {

    protected readonly vacancy$: Observable<IVacancy>;

    protected isDisable: boolean = false;

    constructor(
        protected readonly vacancyService: VacancyService,
        protected readonly previousRouteService: PreviousRouteService,
        protected readonly userService: UserService,
        protected сhangeDetector: ChangeDetectorRef,
        @Inject(CURRENT_ROLE_URL) protected currentRoleUrl: string,
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
                switchMap((vacancy: IVacancy) => this.userService.getCurrentUser()
                    .pipe(
                        map((user: IUser) => {
                            this.isDisable = vacancy.respondedUsers.some((u: IUser) => u.id === user.id);
                            this.сhangeDetector.detectChanges();

                            return vacancy;
                        })
                    ))
            );
    }

    public onReturnButtonClick(): void {
        let previousUrl: string = this.previousRouteService.getPreviousUrl() ?? `${this.currentRoleUrl}/vacancies`;
        previousUrl = previousUrl.includes('/vacancies/') ? `${this.currentRoleUrl}/vacancies` : previousUrl;
        this._router.navigate([`/${ previousUrl }`], { relativeTo: this._activatedRoute });
    }

    public onContactsClick(vacancy: IVacancy): void {
        this._router.navigate([`cabinet/departaments/${ vacancy.departament.id }`])
    }

    public onButtonClick(): void {

    }

    public onLikeClick(): void {
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
