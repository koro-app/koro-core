// import { LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// platformBrowserDynamic([{provide: LOCALE_ID, useValue: 'vi'}]).bootstrapModule(AppModule, {providers: [{provide: LOCALE_ID, useValue: 'vi'}]});
platformBrowserDynamic().bootstrapModule(AppModule);
