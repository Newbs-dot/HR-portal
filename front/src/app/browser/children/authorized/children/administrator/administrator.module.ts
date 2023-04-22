import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLayoutComponent } from './components';
import { AdministratorStartPageComponent } from './pages';

const components: any[] = [];

const pages: any[] = [AdministratorStartPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdministratorStartPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        AdministratorLayoutComponent,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class AdministratorModule {
}
