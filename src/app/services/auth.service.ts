
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient) { }

  // Usa EMAIL per il login
  login(email: string, password: string, username: string): Observable<string> {
  const role = 'USER';

  // ⬇ 1) indichiamo il tipo di risposta: { token: string }
  return this.http.post<{ token: string }>(
    `${this.baseUrl}login`,
    { email, password, username, role }      // corpo della richiesta
  ).pipe(
    // ⬇ 2) estraiamo il token vero e proprio
    map(res => {
      const bearer = res.token;              // es. "Bearer eyJhbGciOi..."
      if (bearer && bearer.startsWith('Bearer ')) {
        return bearer.split(' ')[1];         // ⇒ "eyJhbGciOi..."
      }
      throw new Error('Formato token non valido');
    })
  );
}


  // Registrazione con email
  register(username: string, email: string, password: string): Observable<any> {
    const role = 'USER';
  return this.http.post(`${this.baseUrl}register`, { username, email, password, role })
    .pipe(
      catchError(error => {
        // Estrai il messaggio d'errore dal backend
        let errorMsg = 'Errore sconosciuto durante la registrazione';
        
        if (error.error instanceof ErrorEvent) {
          // Errore lato client
          errorMsg = `Errore: ${error.error.message}`;
        } else if (error.status === 400) {
          // Errore di validazione
          errorMsg = error.error?.message || 'Dati non validi';
        } else if (error.status === 409) {
          // Conflitto (es. email già esistente)
          errorMsg = error.error?.message || 'Email o username già in uso';
        } else if (error.status) {
          // Altri errori HTTP
          errorMsg = `Errore ${error.status}: ${error.error?.message || error.statusText}`;
        }
        
        return throwError(() => new Error(errorMsg));
      })
    );
}

  // Resto del codice invariato...
  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getUserFromToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error('Errore decodifica token', e);
      return null;
    }
  }

  saveUser(token: string): void {
    const userData = this.getUserFromToken(token);
    if (userData) {
      localStorage.setItem('auth-user', JSON.stringify({
        username: userData.username,
        email: userData.email,
        roles: userData.roles
      }));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  getUser(): any {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  }
}