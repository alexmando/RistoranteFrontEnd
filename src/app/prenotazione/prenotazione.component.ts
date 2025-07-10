import { Component } from '@angular/core';
import { PrenotazioneService } from '../services/prenotazione.service';

@Component({
  selector: 'app-prenotazione',
  standalone : false,
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent {
  dataPrenotazione: string = '';
  numeroOspiti: number = 1;

  constructor(private prenotazioneService: PrenotazioneService) {}

  onSubmit(): void {
    this.prenotazioneService.creaPrenotazione(this.dataPrenotazione, this.numeroOspiti)
      .subscribe({
        next: () => alert('Prenotazione creata con successo!'),
        error: (err) => console.error('Errore:', err)
      });
  }
}
