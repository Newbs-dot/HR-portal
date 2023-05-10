import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../interfaces';
import { TuiValidationError } from '@taiga-ui/cdk';
import { AuthModel, AuthService, DestroyService, getUrlByUserRole } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { IBadResponse } from '../../../../../../../common/auth/dto/response/bad-response.interface';

@Component({
    templateUrl: './registration-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/registration-page.component.scss'],
    providers: [DestroyService]
})
export class RegistrationPageComponent {

    public form: FormGroup<IRegister> = new FormGroup<IRegister>({
        email: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', Validators.required),
        confirmPassword: new FormControl<string>('', Validators.required),
    });

    protected formError: TuiValidationError | null = null;

    constructor(
        protected authService: AuthService,
        protected destroy$: DestroyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    public onClick(): void {
        if (!this.form.valid) {
            return;
        }
        const email: string | null = this.form.controls.email.value;
        const password: string | null = this.form.controls.password.value;
        const passwordConfirm: string | null = this.form.controls.confirmPassword.value;
        if (!email || !password || !passwordConfirm) {
            return;
        }
        if (password.length !== passwordConfirm.length || !password.includes(passwordConfirm)) {
            this.setFormInvalid('Пароли должны совпададть');
            return;
        }
        this.authService.register({ email, password, passwordConfirm })
            .pipe(
                tap((response: AuthModel | IBadResponse) => {
                    if (response instanceof AuthModel) {
                        try {
                            const urlByUserRole: string = getUrlByUserRole(response.role);
                            this._router.navigate([`../../cabinet/${ urlByUserRole }`], { relativeTo: this._activatedRoute });
                        }
                        catch (e) {
                            this.setFormInvalid('Ошибка системы, скоро исправим!');
                        }
                        return;
                    }
                    this.setFormInvalid(response.message);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    private setFormInvalid(message: string): void {
        this.formError = new TuiValidationError(message);
        this.clearForm();
        this.authService.logout();
    }

    private clearForm(): void {
        this.form.controls.password.setValue('');
        this.form.controls.password.setErrors(null);
        this.form.controls.email.setValue('');
        this.form.controls.email.setErrors(null);
        this.form.controls.confirmPassword.setValue('');
        this.form.controls.confirmPassword.setErrors(null);
    }
}


