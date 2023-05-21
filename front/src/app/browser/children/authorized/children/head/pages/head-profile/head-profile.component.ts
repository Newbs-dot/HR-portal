import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './head-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-profile.component.scss'],
})
export class HeadProfileComponent extends StartPageBaseComponent {
}
