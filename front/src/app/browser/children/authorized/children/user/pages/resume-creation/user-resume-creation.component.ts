import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService, ISummary, SummaryService } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

@Component({
    templateUrl: './user-resume-creation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-resume-creation.component.scss'],
    providers: [
        DestroyService,
        SummaryService
    ]
})
export class UserResumeCreationComponent {
    constructor(
        protected summaryService: SummaryService,
        protected destroy$: DestroyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.summaryService.getCurrentRespondedSummary()
            .pipe(
                tap((value: ISummary | undefined) => {
                    if (!!value) {
                        this._router.navigate(['/cabinet/profile/edit'])
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
