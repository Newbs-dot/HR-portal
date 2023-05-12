import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './departaments-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/departaments-page-component.scss'],
})
export class DepartamentsPageComponent {
    constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    ) {
    }
    protected onFindJobClick(): void {
        this._router.navigate([`./auth`], { relativeTo: this._activatedRoute });
    }
}
