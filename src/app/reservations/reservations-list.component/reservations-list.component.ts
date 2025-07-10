import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule],
  template: `
    <h2>Lista Prenotazioni</h2>
    <ul>
      <li *ngFor="let r of reservations">
        Tavolo {{ r.tableId }} - {{ r.date }} - {{ r.time }}
        <button (click)="delete(r.id)">Elimina</button>
      </li>
    </ul>
    <a routerLink="/reservations/new">Nuova Prenotazione</a>
  `
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getAll().subscribe(data => this.reservations = data);
  }

  delete(id: number) {
    this.reservationService.delete(id).subscribe(() => {
      this.reservations = this.reservations.filter(r => r.id !== id);
    });
  }
}

