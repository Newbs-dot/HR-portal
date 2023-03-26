import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-head-layout',
    templateUrl: './head-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class HeadLayoutComponent {
}
