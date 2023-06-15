import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const LOGOUT_EVENT: InjectionToken<Subject<void>> = new InjectionToken<Subject<void>>('Эвент логаута');