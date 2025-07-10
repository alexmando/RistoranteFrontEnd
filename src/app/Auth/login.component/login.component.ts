import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone : false,
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <input [(ngModel)]="username" name="username" placeholder="Username" required>
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Accedi</button>
      </form>
      <a routerLink="/register">Non hai un account? Registrati</a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.auth.login(this.username, this.password).subscribe({
    next: () => {
      // Gestisci il successo (il reindirizzamento è già nell'AuthService)
    },
    error: (err) => {
      console.error('Login failed:', err);
      // Mostra messaggio all'utente
    }
  });
}
}
