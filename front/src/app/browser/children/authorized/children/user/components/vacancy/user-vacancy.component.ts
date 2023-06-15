import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { DestroyService, getCompetentsOfTags, ISummary, ITag, IUser, SalaryDevidePipe, SummaryService, UserService, VacancyService } from '../../../../../../../common';
import { EMPTY, switchMap, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-vacancy',
    templateUrl: './user-vacancy.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe, NgForOf, NgStyle, NgIf],
    providers: [
        VacancyService,
        SummaryService,
        DestroyService,
        UserService
    ],
    standalone: true,
})
export class UserVacancyComponent {

    @Input()
    public showRespondButton: boolean = true;

    @Input()
    public id!: string;

    @Input()
    public departamentName!: string;

    @Input()
    public respondedUsers!: IUser[];

    @Input()
    public name!: string;

    @Input()
    public salary!: string;

    @Input()
    public description!: string;

    @Input()
    public tags!: ITag[];

    protected isDisable: boolean = false;

    constructor(
        protected vacancyService: VacancyService,
        protected summaryService: SummaryService,
        protected destroy$: DestroyService,
        protected userService: UserService,
        protected сhangeDetector: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.userService.getCurrentUser()
            .pipe(
                tap((user: IUser) => {
                    this.isDisable = this.respondedUsers.some((u: IUser) => u.id === user.id);
                    this.сhangeDetector.detectChanges();
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public getCompetents(tags: ITag[]): ITag[] {
        return getCompetentsOfTags(tags);
    }

    protected onRespondClick(): void {
        this.summaryService.getCurrentRespondedSummary()
            .pipe(
                switchMap((summary: ISummary | undefined) => {
                    if (!summary) {
                        alert('Сначала добавте резюме');
                        this._router.navigate(['cabinet/resume-creation']);

                        return EMPTY;
                    }
                    return this.vacancyService.respondToVacancy(+this.id)
                        .pipe(
                            tap(() => {
                                alert('Вы откликнулись на вакансию');
                                location.reload();
                            }),
                        )
                }),
                takeUntil(this.destroy$)
            )
            .subscribe()
    }

    protected onDetailClick(): void {
        this._router.navigate([`cabinet/vacancies/${ this.id }`]);
    }

    protected onLikeClick(): void {
        alert('Вы лайкнули вакансию');
    }
}
