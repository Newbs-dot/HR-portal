import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './user-job-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-job-search.component.scss'],
})
export class UserJobSearchComponent extends StartPageBaseComponent {
}
