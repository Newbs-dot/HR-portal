import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartPageBaseComponent } from '../../../../../../../common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiKeySteps} from '@taiga-ui/kit';
import {takeUntil, tap} from "rxjs";

@Component({
    templateUrl: './head-createVacancy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-createVacancy.component.scss'],
})
export class HeadCreateVacancy {
  readonly max = 1_000_000;
  readonly min = 30_000;
  readonly totalSteps = 100;
  readonly ticksLabels = ['0', '10K', '100K', '500k', '1000K'];
  experience = [
    'Меньше года',
    '2-3 года',
    '3-5 лет',
    'Более 5 лет',
  ];

  experienced = [
    'Разработка',
    'Тестирование',
    'Аналитика',
    'Дизайн',
  ];

  readonly keySteps: TuiKeySteps = [
    // [percent, value]
    [0, this.min],
    [50, 100_000],
    [75, 500_000],
    [100, this.max],
  ];

  resumeForms = new FormGroup({
    fullNameValue: new FormControl<string>(``, Validators.required),
    experienceValue: new FormControl(),
    salaryValue: new FormControl(30_000, Validators.required),
    aboutValue: new FormControl<string>(``, Validators.required),
  });
  protected onSaveResumeClick(): void {
    if (!this.resumeForms.valid) {
      return;
    }
    const fullName: string | null = this.resumeForms.controls.fullNameValue.value;
    const experience: string | null = this.resumeForms.controls.experienceValue.value;
    const salary: number | null = this.resumeForms.controls.salaryValue.value;
    const about: string | null = this.resumeForms.controls.aboutValue.value;
  }




}
