import { InjectionToken } from '@angular/core';

export const HEADER_CONTENT: InjectionToken<string> = new InjectionToken<string>('токен, контента хедера', {
    factory: () => {
        return '';
    }
});