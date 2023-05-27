import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterModule, TuiInputModule, TuiInputSliderModule, TuiInputTagModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatedVacanciesHeadComponent, EditProfileComponent, HeadProfileInfoComponent, HeadProfilePageComponent } from './pages/profile';
import { FooterComponent } from '../../../../components';
import { HeadHeaderComponent, HeadVacancyComponent, UserResumeComponent } from './components';
import { CURRENT_ROLE_URL, SalaryDevidePipe } from '../../../../../common';
import { HeadCreateVacancy, HeadFeaturedVacancy } from './pages';
import { VacancyDetailPageComponent } from './pages/vacancy-detail/vacancy-detail-page.component';
import { HeadSummeriesComponent } from './pages/summaries/head-summeries.component';
import { EditSummaryComponent } from './pages/edit-summary/edit-summary.component';


const pages: any[] = [
    HeadProfilePageComponent,
    HeadProfileInfoComponent,
    CreatedVacanciesHeadComponent,
    EditProfileComponent,
    HeadCreateVacancy,
    HeadFeaturedVacancy,
    VacancyDetailPageComponent,
    HeadSummeriesComponent,
    EditSummaryComponent
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
                component: EditSummaryComponent
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
