import { FormControl } from '@angular/forms';

export interface ILogin {
    email: FormControl<string | null>;

    password: FormControl<string | null>;
}