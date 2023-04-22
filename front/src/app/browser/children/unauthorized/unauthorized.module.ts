import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountStartPageComponent } from './pages';
import { UnauthorizedLayoutComponent } from './components';
import {TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule} from "@taiga-ui/kit";

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
                path: 'vacancies',
                component: AccountStartPageComponent,
            },
            {
                path: '',
                redirectTo: 'vacancies',
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
        TuiErrorModule,
        ReactiveFormsModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiInputModule,
        TuiDataListWrapperModule,
    ],
    declarations: [...components, ...pages],
    exports: [...components, ...pages],
})
export class UnauthorizedModule {
}
