import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NotFoundComponent } from '../common/not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule} from "@taiga-ui/kit";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./children/unauthorized/unauthorized.module')
            .then((m: any) => m.UnauthorizedModule)
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./children/authorized/authorized.module')
            .then((m: any) => m.AuthorizedModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
    },

];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        RouterOutlet,
        RouterModule.forRoot(routes),
    ],
    providers: [
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
