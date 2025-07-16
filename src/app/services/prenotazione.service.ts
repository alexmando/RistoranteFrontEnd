import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  private apiUrl = 'http://localhost:8080/'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  creaPrenotazione(data: string, numeroOspiti: number): Observable<any> {
    // Verifica che l'utente sia loggato prima di procedere
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Utente non autenticato'));
    }

    const prenotazioneDTO = {
      dataPrenotazione: data,
      numeroPersone: numeroOspiti,
      utenteId: this.authService.getUser()?.id
    };

    return this.http.post(`${this.apiUrl}prenotazioni`, prenotazioneDTO).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestione centralizzata degli errori
        const errorMessage = this.handleError(error);
        
        if (error.status === 401 || error.status === 403) {
          // Forza il logout e reindirizza al login per errori di autenticazione/autorizzazione
          this.authService.logout();
          this.router.navigate(['/login'], { 
            queryParams: { 
              returnUrl: this.router.url,
              error: errorMessage
            } 
          });
        }
        
        return throwError(() => errorMessage);
      })
    );
  }

  private handleError(error: HttpErrorResponse): string {
    console.error('Errore nella richiesta:', error);

    // Gestione errori con messaggi specifici
    if (error.error instanceof ErrorEvent) {
      return `Errore di rete: ${error.error.message}`;
    }

    // Gestione basata sullo status code
    switch (error.status) {
      case 0:
        return 'Connessione al server fallita. Verifica la tua connessione internet.';
      case 400:
        return error.error?.message || 'Richiesta non valida. Verifica i dati inseriti.';
      case 401:
        return 'Sessione scaduta o non autorizzata. Effettua di nuovo il login.';
      case 403:
        return 'Accesso negato. Non hai i permessi necessari per questa operazione.';
      case 404:
        return 'Risorsa non trovata.';
      case 409:
        return error.error?.message || 'Conflitto: la prenotazione potrebbe essere già esistente.';
      case 422:
        return error.error?.message || 'Errore di validazione dei dati.';
      case 500:
        return error.error?.message || 'Errore interno del server. Riprova più tardi.';
      default:
        return `Errore ${error.status}: ${error.message || 'Si è verificato un errore sconosciuto.'}`;
    }
  }
}