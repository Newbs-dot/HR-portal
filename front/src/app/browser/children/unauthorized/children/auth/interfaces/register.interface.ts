import { FormControl } from '@angular/forms';

export interface IRegister {

    email: FormControl<string | null>;

    password: FormControl<string | null>;

    confirmPassword: FormControl<string | null>;

}