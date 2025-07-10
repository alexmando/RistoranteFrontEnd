import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent, 
    PrenotazioneComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
     RouterModule.forRoot([])
  ],
  providers: [
    AuthService,    
    PrenotazioneService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }