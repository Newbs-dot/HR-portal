import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-vacancy-detail',
    templateUrl: './vacancy-detail-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['/styles/vacancy-detail-component.scss'],
})
export class VacancyDetailPageComponent {
}
