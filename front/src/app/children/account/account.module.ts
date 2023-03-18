import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const components: any[] = [];

const pages: any[] = [];

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [...components, ...pages],
})
export class AccountModule {
}
