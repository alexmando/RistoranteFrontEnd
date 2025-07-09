import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login.component';
import { RegisterComponent } from './Auth/login.component/register.component';
import { ReservationListComponent } from './reservations/app.reservation-list.component';
import { ReservationFormComponent } from './reservations/app.reservation-form.component';
import { TableListComponent } from './tables/app.table-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: ReservationFormComponent },
  { path: 'tables', component: TableListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }