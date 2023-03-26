import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './head-start-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadStartPageComponent extends StartPageBaseComponent {
}
