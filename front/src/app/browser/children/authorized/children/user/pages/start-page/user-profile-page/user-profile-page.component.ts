import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DestroyService, IUser, UserService } from '../../../../../../../../common';


@Component({
    templateUrl: './user-profile-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-start-page.component.scss'],
    providers: [
        UserService,
        DestroyService
    ]
})
export class UserProfilePageComponent {

    protected selectedIndex: number = 2;

    protected tabsKeys: string[] = ['Рассмотренные вакансии', 'Редактировать резюме', 'Профиль']

    protected tabs: Record<string, string> = {
        'Рассмотренные вакансии': 'responded',
        'Редактировать резюме': 'edit',
        'Профиль': 'info'
    };

    protected readonly profile$: Observable<IUser>;

    constructor(
        protected userService: UserService,
        protected destroy$: DestroyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.profile$ = userService.getById(1);
        this._router.events
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((event: any) => {
                if (event instanceof NavigationEnd) {
                    const splitUrl: string[] = this._router.url.split('/');
                    this.selectedIndex = 2;
                    this.tabsKeys.forEach((tab: string, index: number) => {
                        if (this.tabs[tab].includes(splitUrl[splitUrl.length - 1])) {
                            this.selectedIndex = index;
                        }
                    });
                }
            })
    }

    public onTabClick(index: number): void {
        this.selectedIndex = index;
        this._router.navigate([`cabinet/profile/${ this.tabs[this.tabsKeys[index]] }`]);
    }

}
