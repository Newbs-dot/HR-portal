import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthorizedComponent, UserFeaturedVacancy, UserJobDescComponent, UserJobSearchComponent, UserResumeCreationComponent, UserReviewedComponent, UserStartPageComponent, VacanciesAuthorizedComponent } from './pages';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterModule, TuiInputModule, TuiInputSliderModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FooterComponent, HeaderComponent } from '../../../../components';
import { CURRENT_ROLE_URL } from '../../../../../common';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserVacancyComponent } from './components/vacancy/user-vacancy.component';
import { DepartamentsDetailPageComponent } from './pages/departamentы-detail/departaments-detail-page.component';

const components: any[] = [];
const pages: any[] = [
    UserResumeCreationComponent,
    UserStartPageComponent,
    UserJobSearchComponent,
    UserReviewedComponent,
    UserFeaturedVacancy,
    UserJobDescComponent,
    MainAuthorizedComponent,
    VacanciesAuthorizedComponent,
    DepartamentsDetailPageComponent
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
    {
        path: 'featured',
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
    {
        path: 'departaments',
        children: [
            {
                path: ':id',
                component: DepartamentsDetailPageComponent
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
        UserVacancyComponent,
        ReactiveFormsModule,
        TuiFilterModule,
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
        TuiRadioBlockModule,
        UserHeaderComponent
    ],
    declarations: [...components, ...pages],
    providers: [
        {
            provide: CURRENT_ROLE_URL,
            useValue: 'cabinet'
        }
    ]
})
export class UserModule {
}
