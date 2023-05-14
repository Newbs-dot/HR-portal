import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../interfaces';
import { AuthModel, AuthService, DestroyService, getUrlByUserRole } from '../../../../../../../common';
import { takeUntil, tap } from 'rxjs';
import { IBadResponse } from '../../../../../../../common/auth/dto/response/bad-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
    templateUrl: './login-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/registration-page.component.scss'],
    providers: [
        DestroyService,
        AuthService
    ]
})
export class LoginPageComponent {
    public form: FormGroup<ILogin> = new FormGroup<ILogin>({
        email: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', Validators.required),
    });

    protected formError: TuiValidationError | null = null;

    constructor(
        protected authService: AuthService,
        protected destroy$: DestroyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
        window.scrollTo({ top: 0 });
    }

    public onClick(): void {
        if (!this.form.valid) {
            return;
        }
        const email: string | null = this.form.controls.email.value;
        const password: string | null = this.form.controls.password.value;
        if (!email || !password) {
            return;
        }
        this.authService.login({ email, password })
            .pipe(
                tap((response: AuthModel | IBadResponse) => {
                    if (response instanceof AuthModel) {
                        try {
                            const urlByUserRole: string = getUrlByUserRole(response.role);
                            this._router.navigate([`/cabinet/${ urlByUserRole }`], { relativeTo: this._activatedRoute });
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
    }
}