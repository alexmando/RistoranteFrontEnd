import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone : false, 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;
  loading = false;
  loginForm: FormGroup;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe({
      next: (token) => {
        this.auth.saveToken(token);
        this.auth.saveUser(token);
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login failed:', err);
        this.errorMessage = 'Email o password non validi';
      }
    });
  }
}