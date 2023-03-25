import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserLayoutComponent {
}