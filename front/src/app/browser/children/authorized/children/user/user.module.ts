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
  VacanciesAuthorizedComponent,
  UserResumeCreationComponent
} from './pages';
import { HeaderComponent, FooterComponent ,VacancyComponent} from '../../../unauthorized/components';
const components: any[] = [];
import {TuiFilterModule, TuiInputSliderModule, TuiTextAreaModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from "@angular/forms";
import {UserResumeComponent} from '../../components/user-resume/user-resume.component';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule,TuiFieldErrorPipeModule,TuiSelectModule,TuiRadioBlockModule} from '@taiga-ui/kit';
import { TuiErrorModule, TuiTextfieldControllerModule, TuiButtonModule, TuiHintModule, TuiGroupModule} from '@taiga-ui/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
const pages: any[] = [
  UserResumeCreationComponent,
  UserStartPageComponent,
  UserJobSearchComponent,
  UserReviewedComponent,
  UserFeaturedVacancy,
  UserJobDescComponent,
  MainAuthorizedComponent,
  VacanciesAuthorizedComponent,

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
    {
        path: 'resume-creation',
        component: UserResumeCreationComponent
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
    UserResumeComponent,
    TuiErrorModule,
    ReactiveFormsModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiHintModule,
    TuiGroupModule,
    TuiTextAreaModule,
    TuiInputSliderModule,
    TuiSelectModule,
    TuiRadioBlockModule
  ],
    declarations: [...components, ...pages],
})
export class UserModule {
}
