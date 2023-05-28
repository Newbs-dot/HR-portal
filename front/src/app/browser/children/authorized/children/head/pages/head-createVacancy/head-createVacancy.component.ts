import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiKeySteps } from '@taiga-ui/kit';
import { DestroyService, UserService, VacancyService } from '../../../../../../../common';
import { takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './head-createVacancy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-createVacancy.component.scss'],
    providers: [
        UserService,
        VacancyService,
        DestroyService
    ]
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

    protected readonly experience: string[] = [
        'Меньше года',
        '1-2 года',
        '2-3 года',
        '3-5 лет',
        'Более 5 лет',
    ];

    protected resumeForms: any = new FormGroup({
        vacancyNameValue: new FormControl<string>(``, Validators.required),
        salaryValue: new FormControl(30_000, Validators.required),
        aboutValue: new FormControl<string>(``, Validators.required),
        experienceValue: new FormControl<string>(``, Validators.required),
        conditionsValue: new FormControl<[]>([], Validators.required),
        requirementsValue: new FormControl<[]>([], Validators.required),
    });

    constructor(
        protected destroy$: DestroyService,
        protected userService: UserService,
        protected vacancyservice: VacancyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    protected onSaveVacancyClick(): void {
        if (!this.resumeForms.valid) {
            return;
        }
        const name: string | null = this.resumeForms.controls.vacancyNameValue.value;
        const experience: string | null = this.resumeForms.controls.experienceValue.value;
        const salary: number | null = this.resumeForms.controls.salaryValue.value;
        const description: string | null = this.resumeForms.controls.aboutValue.value;
        const vacancyconditions: string | null = '•' + this.resumeForms.controls.conditionsValue.value.join('•');
        const vacancyRequrements: string | null = '•' + this.resumeForms.controls.requirementsValue.value.join('•');
        if (!!name && !!experience && !!description && !!salary && !!vacancyconditions && !!vacancyRequrements) {
            this.vacancyservice.createVacancy({
                experience,
                salary,
                description,
                vacancyRequrements,
                vacancyconditions,
                name
            }, this.userService)
                .pipe(
                    tap(() => {
                        this._router.navigate(['cabinet/head/profile/created']);
                        alert('Вакансия создана');
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe();
        }
    }

}
