import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthorizedComponent, UserFeaturedVacancy, UserJobDescComponent, UserJobSearchComponent, UserProfileEditComponent, UserProfileInfoComponent, UserProfilerRespondedComponent, UserResumeCreationComponent, UserReviewedComponent, VacanciesAuthorizedComponent } from './pages';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterModule, TuiInputModule, TuiInputSliderModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FooterComponent, HeaderComponent } from '../../../../components';
import { CURRENT_ROLE_URL, SalaryDevidePipe } from '../../../../../common';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserVacancyComponent } from './components/vacancy/user-vacancy.component';
import { DepartamentsDetailPageComponent } from './pages/departamentы-detail/departaments-detail-page.component';
import { VacancyDetailPageComponent } from './pages/vacancy-detail/vacancy-detail-page.component';
import { UserProfilePageComponent } from './pages/start-page/user-profile-page/user-profile-page.component';

const components: any[] = [
    UserProfileEditComponent,
    UserProfileInfoComponent,
    UserProfilerRespondedComponent
];
const pages: any[] = [
    UserResumeCreationComponent,
    UserProfilePageComponent,
    UserJobSearchComponent,
    UserReviewedComponent,
    UserFeaturedVacancy,
    UserJobDescComponent,
    MainAuthorizedComponent,
    VacanciesAuthorizedComponent,
    DepartamentsDetailPageComponent,
    VacancyDetailPageComponent
];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: UserProfilePageComponent,
        children: [
            {
                path: 'info',
                component: UserProfileInfoComponent
            },
            {
                path: 'edit',
                component: UserProfileEditComponent
            },
            {
                path: 'responded',
                component: UserProfilerRespondedComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'info'
            }
        ]
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
    },
    {
        path: 'vacancies',
        children: [
            {
                path: ':id',
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
        UserHeaderComponent,
        SalaryDevidePipe
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
