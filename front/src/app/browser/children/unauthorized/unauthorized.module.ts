import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountStartPageComponent } from './pages';
import { UnauthorizedLayoutComponent } from './components';

const components: any[] = [
];

const pages: any[] = [
    AccountStartPageComponent,
];

const routes: Routes = [
    {
        path: '',
        component: AccountStartPageComponent,
        children:[
            {
                path: 'vacncy',
                component: AccountStartPageComponent,
            },
            {
                path: '',
                redirectTo: 'vacncy',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth-module')
            .then((m: any) => m.AuthModule),
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UnauthorizedLayoutComponent,
    ],
    declarations: [...components, ...pages],
    exports: [...components, ...pages],
})
export class UnauthorizedModule {
}
