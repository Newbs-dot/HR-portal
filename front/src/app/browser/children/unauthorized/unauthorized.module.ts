import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent, HeaderComponent, VacancyComponent } from './components';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { MainPageComponent } from './pages';
import { SalaryDevidePipe } from '../../../common';

const components: any[] = [
    FooterComponent,
    VacancyComponent,
    HeaderComponent,
];

const pages: any[] = [
    MainPageComponent,
];

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'main',
                component: MainPageComponent,
            },
            {
                path: '',
                redirectTo: 'main',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'vacancies/:id',
        loadChildren: () => import('./children/vacancy-detail/vacancy-detail.module')
            .then((m: any) => m.VacancyDetailModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth-module')
            .then((m: any) => m.AuthModule),
    },
    {
        path: 'departaments',
        loadChildren: () => import('./children/departaments/departaments.module')
            .then((m: any) => m.DepartamentsModule),
    },
    {
        path: 'departaments/:id',
        loadChildren: () => import('./children/departaments-detail/departaments-detail.module')
            .then((m: any) => m.DepartamentsDetailModule),
    },
    {
        path: 'vacancies',
        loadChildren: () => import('./children/vacancies/vacancies.module')
            .then((m: any) => m.VacanciesModule),
    }

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TuiErrorModule,
        ReactiveFormsModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiInputModule,
        TuiDataListWrapperModule,
        SalaryDevidePipe
    ],
    declarations: [...components, ...pages],
    exports: [...components, ...pages],
})
export class UnauthorizedModule {
}
