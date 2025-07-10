import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  private apiUrl = 'http://localhost:8080/api/prenotazione';

  constructor(private http: HttpClient, private authService: AuthService) {}

  creaPrenotazione(data: string, numeroOspiti: number): Observable<any> {
    // 1. Verifica che l'utente sia loggato
    if (!this.authService.isLoggedIn()) {
      return throwError(() => new Error('Devi effettuare il login per prenotare'));
    }

    // 2. Recupera il token direttamente da localStorage
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Token di autenticazione mancante'));
    }

    // 3. Decodifica il token JWT per ottenere l'ID utente
    let userId: number;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.userId; // Assumendo che il payload contenga userId
      if (!userId) {
        return throwError(() => new Error('ID utente non valido nel token'));
      }
    } catch (e) {
      return throwError(() => new Error('Token malformato'));
    }

    // 4. Crea il DTO per la prenotazione
    const prenotazioneDTO = {
      data: data,
      numeroOspiti: numeroOspiti,
      utente: { id: userId }
    };

    // 5. Invia la richiesta con il token nell'header
    return this.http.post(`${this.apiUrl}/add`, prenotazioneDTO, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}