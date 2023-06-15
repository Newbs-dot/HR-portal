import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { DestroyService, ISummary, SummaryService } from '../../../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './user-profile-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
        SummaryService
    ]
})
export class UserProfileEditComponent {

    protected isEmpty: boolean = true;

    constructor(
        protected summaryService: SummaryService,
        protected destroy$: DestroyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.summaryService.getCurrentRespondedSummary()
            .pipe(
                tap((value: ISummary | undefined) => {
                    if (!value) {
                        this._router.navigate(['/cabinet/resume-creation'])
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

}