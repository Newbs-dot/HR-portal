import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiKeySteps} from '@taiga-ui/kit';
import {takeUntil, tap} from "rxjs";
import {AuthModel, getUrlByUserRole} from "../../../../../../../common";
import {IBadResponse} from "../../../../../../../common/auth/dto/response/bad-response.interface";
@Component({
    templateUrl: './user-resume-creation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-resume-creation.component.scss'],
})
export class UserResumeCreationComponent{
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
    readonly keySteps: TuiKeySteps = [
        // [percent, value]
        [0, this.min],
        [50, 100_000],
        [75, 500_000],
        [100, this.max],
    ];
    constructor(
  private _router: Router,
  private _activatedRoute: ActivatedRoute,
    ) {
    }
    resumeForm = new FormGroup({
        fullNameValue: new FormControl<string>(``, Validators.required),
        experienceValue: new FormControl(),
        salaryValue: new FormControl(30_000, Validators.required),
        aboutValue: new FormControl<string>(``, Validators.required),
    });
    protected onSaveResumeClick(): void {
        if (!this.resumeForm.valid) {
            return;
        }
        const fullName: string | null = this.resumeForm.controls.fullNameValue.value;
        const experience: string | null = this.resumeForm.controls.experienceValue.value;
        const salary: number | null = this.resumeForm.controls.salaryValue.value;
        const about: string | null = this.resumeForm.controls.aboutValue.value;
    }


}
