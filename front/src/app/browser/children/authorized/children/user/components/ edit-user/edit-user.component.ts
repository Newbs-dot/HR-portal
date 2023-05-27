import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiInputModule, TuiInputPhoneModule, TuiInputSliderModule, TuiKeySteps, TuiRadioBlockModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestroyService, SummaryService, TagService, UserService } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap, takeUntil, tap } from 'rxjs';
import { TuiGroupModule } from '@taiga-ui/core';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-resume-creation.component.scss'],
    imports: [
        TuiInputModule,
        TuiInputPhoneModule,
        ReactiveFormsModule,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiInputSliderModule,
        TuiTextAreaModule,
        NgForOf
    ],
    providers: [
        TagService,
        SummaryService,
        DestroyService,
        UserService,
    ],
    standalone: true
})
export class EditUserComponent {

    @Input()
    public title!: string;

    protected readonly max: any = 800_000;

    protected readonly min: any = 30_000;

    protected readonly totalSteps: number = 100;

    protected readonly experience: string[] = [
        'Меньше года',
        '1-2 года',
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
        phone: new FormControl<string>(``, Validators.required),
        experienceValue: new FormControl(),
        salaryValue: new FormControl(30_000, Validators.required),
        aboutValue: new FormControl<string>(``, Validators.required),
    });

    constructor(
        protected destroy$: DestroyService,
        protected summaryService: SummaryService,
        protected userService: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onSaveResumeClick(): void {
        if (!this.resumeForm.valid) {
            return;
        }
        const fullName: string | null = this.resumeForm.controls.fullNameValue.value;
        const phone: string | null = this.resumeForm.controls.phone.value;
        const experience: string | null = this.resumeForm.controls.experienceValue.value;
        const salary: number | null = this.resumeForm.controls.salaryValue.value;
        const about: string | null = this.resumeForm.controls.aboutValue.value;
        if (!!experience && !!salary && !!about) {
            this.summaryService.createSummary({
                experience,
                salary,
                description: about
            })
                .pipe(
                    switchMap(() => {
                        if (!!fullName && !!phone) {
                            return this.userService.updateUser({
                                fullName,
                                phone
                            })
                                .pipe(
                                    tap(() => {
                                        this._router.navigate(['/cabinet/profile/info'])
                                    })
                                )
                        } else {
                            return EMPTY;
                        }
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe();
        }
    }
}