import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiKeySteps } from '@taiga-ui/kit';
import { DestroyService, TagService } from '../../../../../../../common';

@Component({
    templateUrl: './user-resume-creation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-resume-creation.component.scss'],
    providers: [
        TagService,
        DestroyService,
    ]
})
export class UserResumeCreationComponent {
    protected readonly max: any = 1_000_000;

    protected readonly min: any = 30_000;

    protected readonly totalSteps: number = 100;

    protected readonly experience: string[] = [
        'Меньше года',
        '2-3 года',
        '3-5 лет',
        'Более 5 лет',
    ];
    protected readonly keySteps: TuiKeySteps = [
        // [percent, value]
        [0, this.min],
        [50, 100_000],
        [75, 500_000],
        [100, this.max],
    ];
    protected resumeForm: any = new FormGroup({
        fullNameValue: new FormControl<string>(``, Validators.required),
        experienceValue: new FormControl(),
        salaryValue: new FormControl(30_000, Validators.required),
        aboutValue: new FormControl<string>(``, Validators.required),
    });

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

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
