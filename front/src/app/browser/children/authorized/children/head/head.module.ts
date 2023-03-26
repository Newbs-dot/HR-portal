import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadLayoutComponent } from './components';
import { HeadStartPageComponent } from './pages';

const components: any[] = [];

const pages: any[] = [HeadStartPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HeadStartPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        HeadLayoutComponent,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class HeadModule {
}
