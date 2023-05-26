import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadLayoutComponent } from './components';
import {TuiFilterModule, TuiInputSliderModule, TuiTextAreaModule} from '@taiga-ui/kit';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule,TuiFieldErrorPipeModule,TuiSelectModule,TuiRadioBlockModule} from '@taiga-ui/kit';
import { TuiErrorModule, TuiTextfieldControllerModule, TuiButtonModule, TuiHintModule, TuiGroupModule} from '@taiga-ui/core';
import { HeadStartPageComponent,HeadJobSearchComponent,HeadFeaturedVacancy,HeadVacanciesComponent,HeadProfileComponent,HeadCreateVacancy } from './pages';
import {ReactiveFormsModule} from "@angular/forms";
import {FormControl, FormGroup, Validators} from '@angular/forms';

const components: any[] = [];

const pages: any[] = [HeadStartPageComponent,HeadJobSearchComponent,HeadFeaturedVacancy,HeadVacanciesComponent,HeadProfileComponent,HeadCreateVacancy];

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
    {
      path: 'createvacancy',
      component: HeadCreateVacancy
    },

];

@NgModule({
  imports: [
    CommonModule,
    HeadLayoutComponent,
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
