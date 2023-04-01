import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
    templateUrl: './registration-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
    public readonly items: string[] = ['Option 1', 'Option 2', 'Option 3'];

    public testForm: FormGroup<{fio: FormControl<string | null>, login: FormControl<string | null>, password: FormControl<string | null>}> = new FormGroup({
        fio: new FormControl('', Validators.required),
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
    public onClick(event: MouseEvent): void {
        console.info('click ', event);
    }
}


