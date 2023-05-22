import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DepartamentService, DestroyService, getCompetentsOfTags, getTagsOfTags, IDepartament, ITag, IVacancy, TagService, VacancyService } from '../../../../../../../common';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  templateUrl: './vacancies-authorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['/styles/vacancies-authorized.component.scss'],
  providers: [
    VacancyService,
    DepartamentService,
    TagService,
    DestroyService
  ]
})
export class VacanciesAuthorizedComponent {

  public form: FormGroup<{ search: FormControl<string | null> }> = new FormGroup<{ search: FormControl<string | null> }>({
    search: new FormControl<string | null>(''),
  });

  protected filterChange$: Subject<void> = new Subject<void>();

  public filterForm: FormGroup<{ departaments: any, competents: any, tags: any }> = new FormGroup<any>({
    departaments: new FormControl<string[]>([]),
    competents: new FormControl<string[]>([]),
    tags: new FormControl<string[]>([]),
  })

  protected readonly vacancies$: Observable<IVacancy[]>;

  protected readonly departaments$: Observable<string[]>;

  protected readonly tags$: Observable<string[]>;

  protected readonly competents$: Observable<string[]>;

  private _selectedTags: string[] = [];
  private _selecteddepartaments: string[] = [];
  private _selectedcompetentss: string[] = [];

  constructor(
    protected vacancyService: VacancyService,
    protected departamentService: DepartamentService,
    protected tagService: TagService,
    protected destroy$: DestroyService,
  ) {
    window.scrollTo({ top: 0 });
    this.vacancies$ = vacancyService.getAll();
    this.departaments$ = departamentService.getAll()
      .pipe(
        map((departaments: IDepartament[]) => departaments.map((departament: IDepartament) => departament.departamentName))
      );
    this.tags$ = tagService.getAll()
      .pipe(
        map(getTagsOfTags),
        map((tags: ITag[]) => tags.map((tag: ITag) => '#' + tag.name))
      );
    this.competents$ = tagService.getAll()
      .pipe(
        map(getCompetentsOfTags),
        map((tags: ITag[]) => tags.map((tag: ITag) => tag.name))
      );
    this.filterChange$.pipe(
      tap(() => this.form.controls.search.setValue(this.form.controls.search.value)),
      takeUntil(this.destroy$)
    )
      .subscribe();
  }

  protected onDepartamentsChange(model: string[]): void {
    this._selecteddepartaments = model;
    this.filterChange$.next();
  }

  protected onTagsChange(model: string[]): void {
    this._selectedTags = model;
    this.filterChange$.next();
  }

  protected onCompetentsChange(model: string[]): void {
    this._selectedcompetentss = model;
    this.filterChange$.next();
  }

  protected getFilteredVacancies(vacancies: IVacancy[], search: string | null): IVacancy[] {
    return vacancies
      .filter((vacancy: IVacancy) =>
        (!search || vacancy.name.toLowerCase().includes(search.toLowerCase()))
        && (!this._selecteddepartaments?.length || this._selecteddepartaments.includes(vacancy.departament.departamentName))
        && (!this._selectedTags?.length || vacancy.tags.some((tag: ITag) => this._selectedTags.includes('#' + tag.name)))
        && (!this._selectedcompetentss?.length || vacancy.tags.some((tag: ITag) => this._selectedcompetentss.includes(tag.name))));
  }

  protected onClearButtonClick(): void {
    this.filterForm.controls.tags.setValue([])
    this.filterForm.controls.competents.setValue([])
    this.filterForm.controls.departaments.setValue([])
  }

}
