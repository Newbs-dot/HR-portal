import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiKeySteps } from '@taiga-ui/kit';

@Component({
    templateUrl: './head-createVacancy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-createVacancy.component.scss'],
})
export class HeadCreateVacancy {
    protected readonly max: any = 1_000_000;
    protected readonly min: any = 30_000;
    protected readonly totalSteps: number = 100;
    protected readonly keySteps: TuiKeySteps = [
        // [percent, value]
        [0, this.min],
        [50, 100_000],
        [75, 500_000],
        [100, this.max],
    ];

    protected resumeForms: any = new FormGroup({
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
