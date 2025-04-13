import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onRegister(): void {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.error = 'Registration failed'
      });
  }
}
