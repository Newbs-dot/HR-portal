import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './administrator-start-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministratorStartPageComponent extends StartPageBaseComponent {
}
