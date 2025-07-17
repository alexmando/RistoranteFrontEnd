import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from '../services/prenotazione.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-prenotazioni',
  standalone : false,
  templateUrl: '../MiePrenotazione.component/prenotazione.component.html'
})
export class MiePrenotazioneComponent implements OnInit {
  userReservations: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserReservations();
  }

  loadUserReservations() {
    const userId = this.authService.getUser()?.id;
    if (!userId) {
      this.errorMessage = 'Utente non autenticato';
      return;
    }

    this.prenotazioneService.getUserReservations(userId).subscribe({
      next: (data) => {
        this.userReservations = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }
}
