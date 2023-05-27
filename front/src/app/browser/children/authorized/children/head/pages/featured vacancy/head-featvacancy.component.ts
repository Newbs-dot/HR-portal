import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';

@Component({
    templateUrl: './head-featvacancy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-featvacancy.component.scss'],
})
export class HeadFeaturedVacancy extends StartPageBaseComponent {
}

