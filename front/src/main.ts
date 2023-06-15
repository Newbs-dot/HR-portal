import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/browser/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err: any) => console.error(err));
