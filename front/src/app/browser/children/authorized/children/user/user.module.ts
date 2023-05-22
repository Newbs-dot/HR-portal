import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './components';
import {
  UserStartPageComponent,
  UserJobSearchComponent,
  UserReviewedComponent,
  UserFeaturedVacancy,
  UserJobDescComponent,
  MainAuthorizedComponent,
  VacanciesAuthorizedComponent
} from './pages';
import { HeaderComponent, FooterComponent ,VacancyComponent} from '../../../unauthorized/components';
const components: any[] = [];
import { TuiFilterModule } from '@taiga-ui/kit';
import {ReactiveFormsModule} from "@angular/forms";
const pages: any[] = [
  UserStartPageComponent,
  UserJobSearchComponent,
  UserReviewedComponent,
  UserFeaturedVacancy,
  UserJobDescComponent,
  MainAuthorizedComponent,
  VacanciesAuthorizedComponent
];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: UserStartPageComponent
    },
    {
        path: 'search',
        component: UserJobSearchComponent
    },
    {
        path: 'reviewed',
        component: UserReviewedComponent
    },
    {   path: 'featured',
        component: UserFeaturedVacancy
    },
    {
        path: 'description',
        component: UserJobDescComponent
    },
    {
        path: 'main',
        component: MainAuthorizedComponent
    },
    {
        path: 'vacancies',
        component: VacanciesAuthorizedComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        UserLayoutComponent,
        RouterModule.forChild(routes),
        HeaderComponent,
        FooterComponent,
        VacancyComponent,
        ReactiveFormsModule,
        TuiFilterModule,
    ],
    declarations: [...components, ...pages],
})
export class UserModule {
}
