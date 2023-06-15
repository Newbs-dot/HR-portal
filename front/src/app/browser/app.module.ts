import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NotFoundComponent } from '../common/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { of, Subject } from 'rxjs';
import { API_URL, AuthenticatorGuardService, AuthService, LOGOUT_EVENT } from '../common';
import { PreviousRouteService } from '../common/previous-route-service/previous-route.service';

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
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        RouterOutlet,
        RouterModule.forRoot(routes),
    ],
    providers: [
        {
            provide: TUI_LANGUAGE,
            useValue: of(TUI_RUSSIAN_LANGUAGE),
        },
        {
            provide: API_URL,
            useValue: 'http://localhost:80'
        },
        {
            provide: LOGOUT_EVENT,
            useValue: new Subject<void>()
        },
        AuthenticatorGuardService,
        AuthService,
        PreviousRouteService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
