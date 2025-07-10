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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent, 
    PrenotazioneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,    
    PrenotazioneService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }