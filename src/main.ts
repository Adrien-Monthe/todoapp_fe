import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {authInterceptorProviders} from './app/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideRouter(routes),
    authInterceptorProviders
  ]
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
