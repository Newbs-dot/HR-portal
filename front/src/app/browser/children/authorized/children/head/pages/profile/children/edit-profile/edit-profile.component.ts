import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {EMPTY, switchMap, takeUntil, tap} from 'rxjs';
import { DestroyService, ISummary, UserService } from '../../../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: './edit-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/head-edit-profile.component.scss'],
    providers: [
        DestroyService,
        UserService
    ]
})
export class EditProfileComponent {
  @Input()
  public title!: string;
  @Input()
  public buttonName!: string;
  protected isEmpty: boolean = true;
  protected resumeForm: any = new FormGroup({
      fullNameValue: new FormControl<string>(``, Validators.required),
      phoneValue: new FormControl<string>(``, Validators.required),
      emailValue: new FormControl<string>(``, Validators.required),
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
      const email: string | null = this.resumeForm.controls.emailValue.value;
      /*
    if (!!fullName && !!phone && !!email) {
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
  }*/
  }
}
