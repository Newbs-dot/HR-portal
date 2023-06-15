import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLayoutComponent } from './components/layout/administrator-layout.component';
import { AdministratorStartPageComponent } from './pages/start-page/administrator-start-page.component';

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
