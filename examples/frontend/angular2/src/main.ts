import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

window['$'] = window['jQuery'] = require('jquery');

require('bootstrap-sass');

platformBrowserDynamic().bootstrapModule(AppModule);
