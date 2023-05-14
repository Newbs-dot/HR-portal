import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { DepartamentsPageComponent } from './pages';
import {FooterComponent, HeaderComponent, VacancyComponent } from '../../components';
const components: any[] = [];

const pages: any[] = [DepartamentsPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: DepartamentsPageComponent
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
        VacancyComponent
    ],
    declarations: [...components, ...pages],
})
export class DepartamentsModule {

}
