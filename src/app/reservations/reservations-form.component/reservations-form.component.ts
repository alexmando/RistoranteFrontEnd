import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone : true,
  imports: [FormsModule],
  template: `
    <h2>Nuova Prenotazione</h2>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="tableId" name="tableId" placeholder="ID Tavolo" required>
      <input [(ngModel)]="date" name="date" type="date" required>
      <input [(ngModel)]="time" name="time" type="time" required>
      <button type="submit">Prenota</button>
    </form>
  `
})
export class ReservationFormComponent {
  tableId = '';
  date = '';
  time = '';

  constructor(private reservationService: ReservationService, private router: Router) {}

  submit() {
    this.reservationService.create({ tableId: this.tableId, date: this.date, time: this.time })
      .subscribe(() => this.router.navigate(['/reservations']));
  }
}
