import { Component } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()) 
  ]
};
