import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentsPageComponent } from './pages';

const components: any[] = [];

const pages: any[] = [DepartamentsPageComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: DepartamentsPageComponent
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
export class DepartamentsModule {
}
