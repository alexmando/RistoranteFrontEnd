import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone : false,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Ristorante</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
          <a class="nav-link" routerLink="/registrazione" *ngIf="!auth.isLoggedIn()">Registrati</a>
          <a class="nav-link" routerLink="/prenotazioni" *ngIf="auth.isLoggedIn()">Prenotazioni</a>
          <button class="btn btn-link nav-link" (click)="logout()" *ngIf="auth.isLoggedIn()">Logout</button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}