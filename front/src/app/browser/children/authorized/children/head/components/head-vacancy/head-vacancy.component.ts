import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { DestroyService, getCompetentsOfTags, ITag, IUser, SalaryDevidePipe, UserService, VacancyService } from '../../../../../../../common';
import { takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-vacancy',
    templateUrl: './head-vacancy.component.html',
    styleUrls: ['./styles/main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe, NgForOf, NgStyle, NgIf],
    providers: [
        VacancyService,
        DestroyService,
        UserService
    ],
    standalone: true,
})
export class HeadVacancyComponent {

    @Input()
    public showRespondButton: boolean = true;

    @Input()
    public id!: string;

    @Input()
    public departamentName!: string;

    @Input()
    public createdBy!: IUser;

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
        protected destroy$: DestroyService,
        protected userService: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.userService.getCurrentUser()
            .pipe(
                tap((user: IUser) => {
                    if (user.id === this.createdBy.id) {
                        this._router.navigate([`cabinet/head/vacancies-edit/${ this.id }`]);
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public getCompetents(tags: ITag[]): ITag[] {
        return getCompetentsOfTags(tags);
    }

    protected onDetailClick(): void {
        this._router.navigate([`cabinet/head/vacancies/${ this.id }`]);
    }
}
