import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component/login.component';
import { RegisterComponent } from './auth/register.component/register.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { PrenotazioneService } from './services/prenotazione.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component/navbar.component';
import { HomeComponent } from './home.component/home.component';
import { FooterComponent } from './footer.component/footer.component';
import { MiePrenotazioneComponent } from './MiePrenotazione.component/prenotazione.component';

import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptor.component/interceptor.component';

import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent, 
    PrenotazioneComponent, 
    FooterComponent,
    MiePrenotazioneComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
     RouterModule.forRoot([{ path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },])
  ],
  providers: [
    AuthService,    
    PrenotazioneService,
    provideHttpClient(withFetch(),                
      withInterceptorsFromDi() ),  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }