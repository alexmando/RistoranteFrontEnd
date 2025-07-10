import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>  <!-- 👈 Punto di inserimento per le route -->
    <app-footer></app-footer>
  `
  
})
export class AppComponent {
  title = 'Ristorante';
}
