import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISummary, SummaryService } from '../../../../../../../common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './head-summeries.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['/styles/vacancies-authorized.component.scss'],
    providers: [SummaryService]
})
export class HeadSummeriesComponent {

    public form: FormGroup<{ search: FormControl<string | null> }> = new FormGroup<{ search: FormControl<string | null> }>({
        search: new FormControl<string | null>(''),
    });

    protected readonly summeries$: Observable<ISummary[]>

    constructor(
        protected summaryService: SummaryService,
    ) {
        this.summeries$ = this.summaryService.getAllCurrent();
    }

    protected getFilteredSummeries(summaries: ISummary[], search: string | null): ISummary[] {
        return summaries
            .filter((summary: ISummary) =>
                (!search || summary.createdBy.userFullName.toLowerCase().includes(search.toLowerCase())));
    }

}