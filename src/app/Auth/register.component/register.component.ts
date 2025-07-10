import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone : false,
  template: `
    <div class="register-container">
      <h2>Registrazione</h2>
      <form (ngSubmit)="register()">
        <input [(ngModel)]="user.username" name="username" placeholder="Username" required>
        <input [(ngModel)]="user.email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="user.password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Registrati</button>
      </form>
      <a routerLink="/login">Hai già un account? Accedi</a>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => console.error('Registrazione fallita', err)
    });
  }
}