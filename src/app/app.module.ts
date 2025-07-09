import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

import { LoginComponent } from './Auth/login.component'; 
import { RegisterComponent } from './Auth/register.component';

import { ReservationListComponent } from './reservations/reservation-list.component';
import { ReservationFormComponent } from './reservations/reservation-form.component';

import { TableListComponent } from './tables/table-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReservationListComponent,
    ReservationFormComponent,
    TableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [], // Servizi dovrebbero usare providedIn: 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }