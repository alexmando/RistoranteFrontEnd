import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component/login.component';
import { RegisterComponent } from './auth/register.component/register.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { HomeComponent } from './home.component/home.component';
import { MiePrenotazioneComponent } from './MiePrenotazione.component/prenotazione.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Solo questa per path vuoto
  { path: 'home', component: HomeComponent }, // Cambiato path da '' a 'home'
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'prenotazioni', component: PrenotazioneComponent },
  { path: 'mie-prenotazioni', component: MiePrenotazioneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }