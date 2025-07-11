import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone : false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null; 
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
