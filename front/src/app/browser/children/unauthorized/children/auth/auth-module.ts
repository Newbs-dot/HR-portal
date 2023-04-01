import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, RegistrationPageComponent } from './pages';
import { UnauthorizedLayoutComponent } from '../../components';
import {TuiErrorModule, TuiTextfieldControllerModule, TuiButtonModule } from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule,TuiFieldErrorPipeModule} from "@taiga-ui/kit";

const components: any[] = [];

const pages: any[] = [LoginPageComponent, RegistrationPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'reg',
        component: RegistrationPageComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UnauthorizedLayoutComponent,
    TuiErrorModule,
    ReactiveFormsModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
    declarations: [...components, ...pages],
})
export class AuthModule {
}
