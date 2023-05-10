import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentsDetailPageComponent } from './pages';

const components: any[] = [];

const pages: any[] = [
    DepartamentsDetailPageComponent
];

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DepartamentsDetailPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class DepartamentsDetailModule {
}
