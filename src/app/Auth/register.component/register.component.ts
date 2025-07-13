

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone : false, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Test di connessione al backend
    this.http.get('http://localhost:8080/').subscribe({
      next: (res) => {
        console.log('Backend raggiungibile', res);
      },
      error: (err) => {
        console.error('Problema di connessione al backend', err);
        this.errorMessage = 'Impossibile connettersi al server. Riprova più tardi.';
      }
    });
  }

  register() {
    if (this.registerForm.invalid) {
      // Mostra errori specifici per ogni campo
      this.errorMessage = 'Per favore correggi i seguenti errori:';
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.errors) {
          this.errorMessage += `\n${key}: `;
          if (control.errors['required']) this.errorMessage += 'Campo obbligatorio';
          if (control.errors['email']) this.errorMessage += 'Email non valida';
          if (control.errors['minlength']) {
            this.errorMessage += `Minimo ${control.errors['minlength'].requiredLength} caratteri`;
          }
        }
      });
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    const { username, email, password } = this.registerForm.value;

    this.auth.register(username, email, password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response && response.success) {
          this.successMessage = 'Registrazione completata con successo!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = response?.message || 'Registrazione fallita';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Registration failed:', err);
        this.errorMessage = typeof err === 'string' ? err : 
                          err.message || 'Errore durante la registrazione';
      }
    });
  }
}
  /*
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone : false, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    const { username, email, password } = this.registerForm.value;

    this.auth.register(username, email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Registrazione completata con successo!';
        
        // Reindirizza al login dopo 2 secondi
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error('Registration failed:', err);
        this.errorMessage = err.error?.message || 'Errore durante la registrazione';
      }
    });
  }
}*/