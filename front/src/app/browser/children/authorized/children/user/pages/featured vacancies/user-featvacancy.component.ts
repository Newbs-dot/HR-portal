import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './user-vacancy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-vacancy.component.scss'],
})
export class UserFeaturedVacancy extends StartPageBaseComponent {
}

