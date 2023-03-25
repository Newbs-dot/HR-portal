import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './user-start-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStartPageComponent extends StartPageBaseComponent {
}