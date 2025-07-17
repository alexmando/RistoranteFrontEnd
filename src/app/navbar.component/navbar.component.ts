import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" routerLink="/">Ristorante</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" *ngIf="!auth.isLoggedIn()">
          <a class="nav-link" routerLink="/login">Login</a>
        </li>
        <li class="nav-item" *ngIf="!auth.isLoggedIn()">
          <a class="nav-link" routerLink="/register">Registrati</a>
        </li>

        <li class="nav-item" *ngIf="auth.isLoggedIn()">
          <a class="nav-link" routerLink="/mie-prenotazioni">
            <i class="fas fa-calendar-check me-1"></i>
            Le mie prenotazioni
          </a>
        </li>
        <li class="nav-item" *ngIf="auth.isLoggedIn()">
          <button class="btn btn-link nav-link" (click)="logout()">Logout</button>
        </li>
      </ul>
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