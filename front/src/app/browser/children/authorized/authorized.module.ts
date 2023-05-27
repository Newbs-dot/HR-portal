import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles, SalaryDevidePipe } from '../../../common';

const components: any[] = [];

const pages: any[] = [];

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./children/user/user.module').then((m: any) => m.UserModule),

        //canActivate: [AuthenticatorGuardService],
        //data: {
        //    role: Roles.User
        //}
    },
    {
        path: 'head',
        loadChildren: () => import('./children/head/head.module').then((m: any) => m.HeadModule),
        data: {
            role: Roles.DepartmentsHead
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('./children/administrator/administrator.module').then((m: any) => m.AdministratorModule),
        data: {
            role: Roles.Admin
        }
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SalaryDevidePipe,

    ],
    declarations: [...components, ...pages],
})
export class AuthorizedModule {
}
