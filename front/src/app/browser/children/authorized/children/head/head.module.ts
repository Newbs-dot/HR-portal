import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadLayoutComponent } from './components';
import { HeadStartPageComponent,HeadJobSearchComponent,HeadFeaturedVacancy,HeadVacanciesComponent,HeadProfileComponent } from './pages';

const components: any[] = [];

const pages: any[] = [HeadStartPageComponent,HeadJobSearchComponent,HeadFeaturedVacancy,HeadVacanciesComponent,HeadProfileComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HeadStartPageComponent
    },
    {
        path: 'profiles',
        component: HeadProfileComponent
    },
    {
        path: 'searchhead',
        component: HeadJobSearchComponent
    },
    {   path: 'featuredvacancy',
        component: HeadFeaturedVacancy
    },
    {
        path: 'myvacancy',
        component: HeadVacanciesComponent
    },

];

@NgModule({
    imports: [
        CommonModule,
        HeadLayoutComponent,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class HeadModule {
}
