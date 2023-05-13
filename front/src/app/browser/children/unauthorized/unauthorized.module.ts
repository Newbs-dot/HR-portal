import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { SalaryDevidePipe } from 'src/app/common';
import { FooterComponent, HeaderComponent, VacancyComponent } from './components';
import { MainPageComponent } from './pages/main/main-page.component';




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
        SalaryDevidePipe,
        HeaderComponent,
        FooterComponent,
        VacancyComponent
    ],
    declarations: [
        MainPageComponent
    ],
})
export class UnauthorizedModule {
}
