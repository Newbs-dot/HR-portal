import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {
  DepartamentService,
  IDepartament,
  IVacancy,
  StartPageBaseComponent,
  VacancyService
} from '../../../../../../../common';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './user-reviewed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/user-reviewed.component.scss'],
    providers: [
        DepartamentService,
        VacancyService
    ]
})
export class UserReviewedComponent{
  @ViewChild('departaments')
    private set departamentsTemplateSet(value: ElementRef) {
        this.departamentsTemplate = value;
        this.cdr.detectChanges();
    }

  protected readonly vacancies$: Observable<IVacancy[]>;

  protected readonly departaments$: Observable<IDepartament[]>;

  protected departamentsTemplate!: ElementRef;

  constructor(
    protected departamentsService: DepartamentService,
    protected vacancyService: VacancyService,
    protected cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
      this.vacancies$ = vacancyService.getAll();
      this.departaments$ = departamentsService.getAll();
  }
}

