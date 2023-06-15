import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DepartamentService, IDepartament, IVacancy, VacancyService } from '../../../../../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
    templateUrl: './head-main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/main-authorized.component.scss'],
    providers: [
        DepartamentService,
        VacancyService
    ]
})
export class HeadMainPageComponent {

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

  public onDepartamentClick(departament: IDepartament): void {
      this._router.navigate([`../departaments/${ departament.id }`], { relativeTo: this._activatedRoute });
  }
}


