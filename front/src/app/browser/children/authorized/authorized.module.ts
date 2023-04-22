import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const components: any[] = [];

const pages: any[] = [];

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./children/user/user.module').then((m: any) => m.UserModule)
    },
    {
        path: 'head',
        loadChildren: () => import('./children/head/head.module').then((m: any) => m.HeadModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./children/administrator/administrator.module').then((m: any) => m.AdministratorModule)
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class AuthorizedModule {
}
