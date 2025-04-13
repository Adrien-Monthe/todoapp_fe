import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {IUser} from '../interfaces/user';

const TOKEN_KEY = 'TOKEN_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly resourceUrl = SERVER_API_URL + '/auth';
  private readonly http = inject(HttpClient)

  constructor(private readonly router: Router) {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

  login(data: IUser) {
    return this.http.post(this.resourceUrl + '/login', data);
  }

  register(data: IUser) {
    return this.http.post<IUser>(this.resourceUrl + '/register', data);
  }
}
