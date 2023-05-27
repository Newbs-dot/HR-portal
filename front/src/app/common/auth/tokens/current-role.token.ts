import { InjectionToken } from '@angular/core';

export const CURRENT_ROLE_URL: InjectionToken<string> = new InjectionToken<string>('токен урла текущей роли пользователя', {
    factory: () => ''
});