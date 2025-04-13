import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../auth/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;

    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    authReq = request.clone({
      headers: header
    });

    const token = this.authService.getToken();
    if (token != null) {
      let authHeader: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      });
      authReq = request.clone({
        headers: authHeader
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];
