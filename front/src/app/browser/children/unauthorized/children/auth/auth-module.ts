import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, RegistrationPageComponent } from './pages';
import { UnauthorizedLayoutComponent } from '../../components';

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
    ],
    declarations: [...components, ...pages],
})
export class AuthModule {
}
