import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-administrator-layout',
    templateUrl: './administrator-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AdministratorLayoutComponent {
}
