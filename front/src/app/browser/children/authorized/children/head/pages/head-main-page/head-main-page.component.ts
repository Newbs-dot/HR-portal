import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './head-main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadMainPageComponent extends StartPageBaseComponent {
}
