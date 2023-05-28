import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class PreviousRouteService {

    private _previousUrl: string | null = null;

    private _currentUrl: string;

    constructor(
        private _router: Router
    ) {
        this._currentUrl = this._router.url;
        _router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this._previousUrl = this._currentUrl;
                this._currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl(): string | null {
        return this._previousUrl;
    }
}