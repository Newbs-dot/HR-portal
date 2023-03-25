import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-not-auth-layout',
    templateUrl: './unauthorized-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UnauthorizedLayoutComponent {
}