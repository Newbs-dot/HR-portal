import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesPageComponent } from './pages';
import {  VacancyComponent } from '../../components';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFilterModule } from '@taiga-ui/kit';
import { FooterComponent, HeaderComponent } from '../../../../components';


const components: any[] = [];

const pages: any[] = [
    VacanciesPageComponent
];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: VacanciesPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FooterComponent,
        HeaderComponent,
        VacancyComponent,
        ReactiveFormsModule,
        TuiFilterModule,
    ],
    declarations: [...components, ...pages],
})
export class VacanciesModule {
}
