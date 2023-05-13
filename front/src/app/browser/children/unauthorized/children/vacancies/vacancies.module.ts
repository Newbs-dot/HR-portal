import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesPageComponent } from './pages';
import { FooterComponent, HeaderComponent } from '../../components';


const components: any[] = [

];

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
    ],
    declarations: [...components, ...pages],
})
export class VacanciesModule {
}
