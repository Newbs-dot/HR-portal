import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IDepartamentsInfo, IVacancies } from '../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: './main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/main-page.component.scss'],
})
export class MainPageComponent {

    protected departamentInfoList: IDepartamentsInfo[] = [
        {
            name: 'Департамент разработки',
            logoName: 'developer-img',
            id: 0,
        },
        {
            name: 'Департамент развития',
            logoName: 'manager-img',
            id: 1,
        },
        {
            name: 'Департамент тестирования',
            logoName: 'tester-img',
            id: 2,
        }
    ];

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
        }, {
            id: 4,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        }, {
            id: 5,
            departamentName: 'department',
            name: 'department',
            salaryFrom: '60000',
            salaryTo: '100000',
            description: 'Команда международных проектов ищет проектировщика интерфейов (UX/UI), который вместе с продуктовой командой займется проектированием сложного технического'
        }
    ];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    public onDepartamentClick(departament: IDepartamentsInfo): void {
        this._router.navigate([`./departaments/${ departament.id }`], { relativeTo: this._activatedRoute });
    }
}


