import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './components';
import { UserStartPageComponent } from './pages';
import { UserJobSearchComponent } from './pages';
const components: any[] = [];

const pages: any[] = [UserStartPageComponent,UserJobSearchComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: UserStartPageComponent
    },
    {
        path: 'search',
        component: UserJobSearchComponent
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
