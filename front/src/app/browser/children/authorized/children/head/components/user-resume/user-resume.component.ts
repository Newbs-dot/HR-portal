import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCompetentsOfTags, ITag, SalaryDevidePipe } from '../../../../../common';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-resume',
    templateUrl: './user-resume.component.html',
    styleUrls: ['./styles/user-resume.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SalaryDevidePipe, NgForOf],
    standalone: true,
})
export class UserResumeComponent {

  @Input()
    public id!: string;

  @Input()
  public salary!: string;

  @Input()
  public description!: string;

  @Input()
  public experience!: string;

}
