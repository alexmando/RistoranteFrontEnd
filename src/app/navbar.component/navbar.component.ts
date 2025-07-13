import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/home">Ristorante</a> <!-- Cambiato in /home -->
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
          <a class="nav-link" routerLink="/register" *ngIf="!auth.isLoggedIn()">Registrati</a> <!-- Cambiato da /registrazione a /register -->
          <a class="nav-link" routerLink="/prenotazioni" *ngIf="auth.isLoggedIn()">Prenotazioni</a>
          <button class="btn btn-link nav-link" (click)="logout()" *ngIf="auth.isLoggedIn()">Logout</button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {} // Aggiunto Router

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); // Doppio controllo per il reindirizzamento
  }
}