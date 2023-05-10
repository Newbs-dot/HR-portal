import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { MainPageComponent } from './pages/main/main-page.component';
import { UnauthorizedLayoutComponent } from './components/layout/unauthorized-layout.component';

const components: any[] = [];

const pages: any[] = [
    MainPageComponent,
];

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'main',
                component: MainPageComponent,
            },
            {
                path: '',
                redirectTo: 'main',
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
