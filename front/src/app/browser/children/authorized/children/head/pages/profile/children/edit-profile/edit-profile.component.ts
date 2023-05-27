import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { DestroyService, ISummary, SummaryService } from '../../../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './edit-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
        SummaryService
    ]
})
export class EditProfileComponent {

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