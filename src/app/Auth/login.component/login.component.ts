import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false, 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;
  loading = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
      username: ['']
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    
    const { email, password, username } = this.loginForm.value;

    this.authService.login(email, password, username).subscribe({
      next: (token) => {
        // Non serve più chiamare saveToken e saveUser separatamente
        // perché ora sono gestiti internamente dal servizio durante il login
        this.loading = false;
        
        // Verifica se l'utente è autenticato prima del redirect
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Errore durante il login';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Login failed:', err);
        this.errorMessage = err.message || 'Email o password non validi';
      }
    });
  }
}