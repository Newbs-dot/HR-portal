import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterModule, TuiInputModule, TuiInputSliderModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { HeadCreateVacancy, HeadFeaturedVacancy, HeadJobSearchComponent, HeadProfileComponent, HeadStartPageComponent, HeadVacanciesComponent } from './pages';
import { ReactiveFormsModule } from '@angular/forms';

const components: any[] = [];

const pages: any[] = [HeadStartPageComponent, HeadJobSearchComponent, HeadFeaturedVacancy, HeadVacanciesComponent, HeadProfileComponent, HeadCreateVacancy];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HeadStartPageComponent
    },
    {
        path: 'profile',
        component: HeadProfileComponent
    },
    {
        path: 'searchhead',
        component: HeadJobSearchComponent
    },
    {
        path: 'featuredvacancy',
        component: HeadFeaturedVacancy
    },
    {
        path: 'my-vacancies',
        component: HeadVacanciesComponent
    },
    {
        path: 'create-vacancy',
        component: HeadCreateVacancy
    },

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
        ReactiveFormsModule
    ],
    declarations: [...components, ...pages],
})
export class HeadModule {
}
