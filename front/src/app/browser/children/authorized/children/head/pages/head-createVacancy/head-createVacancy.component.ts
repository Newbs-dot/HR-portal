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
    readonly keySteps: TuiKeySteps = [
        // [percent, value]
        [0, this.min],
        [50, 100_000],
        [75, 500_000],
        [100, this.max],
    ];

    resumeForms = new FormGroup({
        vacancyNameValue: new FormControl<string>(``, Validators.required),
        salaryValue: new FormControl(30_000, Validators.required),
        aboutValue: new FormControl<string>(``, Validators.required),
        conditionsValue: new FormControl<string>(``, Validators.required),
        requirementsValue: new FormControl<string>(``, Validators.required),
    });
    protected onSaveVacancyClick(): void {
        if (!this.resumeForms.valid) {
            return;
        }
        const vacancyName: string | null = this.resumeForms.controls.vacancyNameValue.value;
        const salary: number | null = this.resumeForms.controls.salaryValue.value;
        const about: string | null = this.resumeForms.controls.aboutValue.value;
        const conditions: string | null = this.resumeForms.controls.conditionsValue.value;
        const requirements: string | null = this.resumeForms.controls.requirementsValue.value;
    }




}
