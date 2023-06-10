import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterModule, TuiInputModule, TuiInputSliderModule, TuiInputTagModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatedVacanciesHeadComponent, EditProfileComponent, HeadProfileInfoComponent, HeadProfilePageComponent } from './pages/profile';
import { FooterComponent } from '../../../../components';
import { CURRENT_ROLE_URL, SalaryDevidePipe } from '../../../../../common';
import {HeadCreateVacancy, HeadFeaturedVacancy, HeadMainPageComponent} from './pages';
import { VacancyDetailPageComponent } from './pages/vacancy-detail/vacancy-detail-page.component';
import { HeadSummeriesComponent } from './pages/summaries/head-summeries.component';
import { EditVacancyComponent } from './pages/edit-summary/edit-vacancy.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { HeadHeaderComponent } from './components/head-header/head-header.component';
import { UserResumeComponent } from './components/user-resume/user-resume.component';
import { HeadVacancyComponent } from './components/head-vacancy/head-vacancy.component';
import { HeadProfileComponent } from './components/head-profile/head-profile.component';


const pages: any[] = [
    HeadProfilePageComponent,
    HeadProfileInfoComponent,
    CreatedVacanciesHeadComponent,
    HeadCreateVacancy,
    HeadFeaturedVacancy,
    VacancyDetailPageComponent,
    HeadSummeriesComponent,
    EditVacancyComponent
];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: HeadProfilePageComponent,
        children: [
            {
                path: 'info',
                component: HeadProfileInfoComponent
            },
            {
                path: 'created',
                component: CreatedVacanciesHeadComponent
            },
            {
                path: 'edit',
                component: EditProfileComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'info'
            }
        ]
    },
    {
        path: 'vacancy-creation',
        component: HeadCreateVacancy,
    },
    {
        path: 'vacancies-edit',
        children: [
            {
                path: ':id',
                component: EditVacancyComponent
            }
        ]
    },
    {
        path: 'vacancies',
        component: HeadFeaturedVacancy
    },
    {
        path: 'summeries',
        component: HeadSummeriesComponent
    },
    {
        path: 'main',
        component: HeadMainPageComponent
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
        TuiFilterModule,
        TuiErrorModule,
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
        ReactiveFormsModule,
        FooterComponent,
        HeadHeaderComponent,
        HeadVacancyComponent,
        UserResumeComponent,
        SalaryDevidePipe,
        TuiInputTagModule,
        HeadProfileComponent,
        TuiTextfieldControllerModule,
        TuiLetModule,
        EditProfileComponent,
    ],
    declarations: [...pages],
    providers: [
        {
            provide: CURRENT_ROLE_URL,
            useValue: 'cabinet/head'
        }
    ]
})
export class HeadModule {
}
