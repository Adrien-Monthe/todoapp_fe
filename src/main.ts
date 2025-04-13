import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([])
    ),
    provideRouter(routes),
  ]
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
