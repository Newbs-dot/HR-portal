import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyDetailPageComponent } from './pages';
import { SalaryDevidePipe } from '../../../../../common';
import { FooterComponent, HeaderComponent } from '../../../../components';

const components: any[] = [];

const pages: any[] = [VacancyDetailPageComponent];

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: VacancyDetailPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderComponent,
        FooterComponent,
        SalaryDevidePipe,
    ],
    declarations: [...components, ...pages],
})
export class VacancyDetailModule {
}
