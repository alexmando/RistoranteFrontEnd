import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone : false,
  template: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => console.error('Registrazione fallita', err)
    });
  }

  
}