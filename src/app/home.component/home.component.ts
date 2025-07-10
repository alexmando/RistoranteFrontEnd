import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone : false,
  template: `
    <div class="jumbotron">
      <h1>Benvenuto</h1>
      <p *ngIf="!auth.isLoggedIn()">Accedi o registrati per prenotare</p>
      <a routerLink="/prenotazioni" class="btn btn-primary" *ngIf="auth.isLoggedIn()">
        Crea Prenotazione
      </a>
    </div>
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
