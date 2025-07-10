import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  private apiUrl = 'http://localhost:8080/api/prenotazione';

  constructor(private http: HttpClient, private authService: AuthService) {}

  creaPrenotazione(data: string, numeroOspiti: number): Observable<any> {
    const prenotazioneDTO = {
      data: data,
      numeroOspiti: numeroOspiti,
      utente: { id: this.authService.currentUserValue.id } // Recupera l'ID dall'AuthService
    };
    return this.http.post(`${this.apiUrl}/add`, prenotazioneDTO);
  }

  getPrenotazioni(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
}