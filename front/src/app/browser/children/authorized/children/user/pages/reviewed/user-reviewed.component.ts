import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './user-reviewed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-reviewed.component.scss'],
})
export class UserReviewedComponent extends StartPageBaseComponent {
}

