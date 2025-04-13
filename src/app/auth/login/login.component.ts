import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  onLogin(): void {
    this.authService.login({username: this.username, password: this.password})
      .subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/tasks']);
        },
        error: () => this.error = 'Invalid username or password'
      });
  }
}
