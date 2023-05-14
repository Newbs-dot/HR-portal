import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IVacancies } from "../../../../../../../common";

@Component({
    templateUrl: './departaments-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/departaments-page-component.scss'],
})
export class DepartamentsPageComponent {

    protected vacancies: IVacancies[] = [
        {
            id: 0,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        },
        {
            id: 1,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        }, {
            id: 2,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        }, {
            id: 3,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        }];
    constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    ) {
    }
    protected onFindJobClick(): void {
        this._router.navigate([`./auth`], { relativeTo: this._activatedRoute });
    }
    protected onFindAllJobs(): void {
        this._router.navigate([`./vacancies`], { relativeTo: this._activatedRoute });
    }
}
