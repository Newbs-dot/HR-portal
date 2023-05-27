import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DestroyService, UserService } from '../../../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { EMPTY, takeUntil, tap } from 'rxjs';

@Component({
    templateUrl: './edit-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-edit-profile.component.scss'],
    providers: [
        DestroyService,
        UserService
    ],
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPhoneModule
    ],
    standalone: true
})
export class EditProfileComponent {
    @Input()
    public title!: string;
    @Input()
    public buttonName!: string;
    protected resumeForm: any = new FormGroup({
        fullNameValue: new FormControl<string>(``, Validators.required),
        phoneValue: new FormControl<string>(``, Validators.required),
    });

    constructor(
        protected destroy$: DestroyService,
        protected userService: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {

    }

    protected onSaveResumeClick(): void {
        if (!this.resumeForm.valid) {
            alert('Не заполнили форму полностью');
            return;
        }
        const fullName: string | null = this.resumeForm.controls.fullNameValue.value;
        const phone: string | null = this.resumeForm.controls.phoneValue.value;
        if (!!fullName && !!phone) {
            this.userService.updateUser({
                fullName,
                phone
            })
                .pipe(
                    tap(() => {
                        alert('Профиль изменен');
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe()
        }
    }
}
