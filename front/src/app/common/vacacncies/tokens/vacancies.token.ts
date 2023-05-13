import { InjectionToken } from '@angular/core';
import { IVacancies } from '../interfaces';

export const REQUESTED_VACANCIES: InjectionToken<IVacancies> = new InjectionToken<IVacancies>('токен запрошенных вакансий');