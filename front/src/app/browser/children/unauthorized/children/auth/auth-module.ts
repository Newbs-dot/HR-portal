import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, RegistrationPageComponent } from './pages';
import { TuiErrorModule, TuiTextfieldControllerModule, TuiButtonModule, TuiHintModule, TuiGroupModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule, TuiFieldErrorPipeModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { HeaderComponent } from '../../components';

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
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
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
        HeaderComponent,
        TuiInputPasswordModule,
    ],
    declarations: [...components, ...pages],
})
export class AuthModule {
}
