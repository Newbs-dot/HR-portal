import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './components';
import { UserStartPageComponent } from './pages';

const components: any[] = [];

const pages: any[] = [UserStartPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vacancy'
    },
    {
        path: 'vacancy',
        component: UserStartPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        UserLayoutComponent,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class UserModule {
}
