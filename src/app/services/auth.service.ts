

 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth/';
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Effettua il login e salva il token JWT
   */
  login(email: string, password: string, username?: string): Observable<string> {
   return this.http.post<{ accessToken: string }>( // ← Corretto il nome della proprietà
    `${this.baseUrl}login`,
    { email, password, username }
  ).pipe(
    map(response => {
      // 1. Verifica esistenza token
      if (!response.accessToken) { // ← Usa accessToken
        throw new Error('Token non ricevuto dal server');
      }
      
      // 2. Estrai token (rimuovi 'Bearer ' se presente)
      const token = response.accessToken.startsWith('Bearer ')
         ? response.accessToken
         : `Bearer ${response.accessToken}`;
      
      // 3. DEBUG: Verifica token
      console.log('🔑 Token ricevuto:', token);
      
      // 4. Salva nel localStorage
      this.saveAuthData(token);
      return token;
    }),
    catchError(error => {
      console.error('Login error:', error);
      return throwError(() => this.handleAuthError(error));
    })
  );
  }

  /**
   * Registra un nuovo utente
   */
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, { username, email, password })
      .pipe(
        catchError(error => throwError(() => this.handleAuthError(error)))
      );
  }

  /**
   * Salva i dati di autenticazione nel localStorage
   */
 /**
 * Salva il token e (opzionalmente) decodifica il payload JWT.
 * Se il token non è un JWT valido, salva solo la stringa grezza.
 */
private saveAuthData(token: string): void {
  if (!token || typeof token !== 'string') {
    console.error('❌ Token non valido');
    return;
  }

  // 1. Salva il token così com'è
  localStorage.setItem(this.tokenKey, token);
  console.log('🔑 Token salvato:', token);

  // 2. Prova a decodificare il payload (se è un JWT)
  const payload = this.decodeToken(token);
  if (payload) {
    // 3. Se è un JWT valido, salva i dati utente
    localStorage.setItem(this.userKey, JSON.stringify({
      id: payload.userId|| '' ,
      email: payload.sub,
      roles: payload.roles || ['USER'] // Default per sicurezza
    }));
  } else {
    // 4. Se NON è un JWT, imposta dati utente minimi
    localStorage.setItem(this.userKey, JSON.stringify({
      roles: ['USER'] // Ruolo di fallback
    }));
  }
}

/**
 * Decodifica un token JWT standard (Base64Url).
 * Restituisce `null` se il token non è un JWT valido.
 */
private decodeToken(token: string): any | null {
  try {
    // 1. Verifica se è un JWT (formato: header.payload.firma)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('⚠️ Token non è un JWT valido (mancano parti)');
      return null;
    }

    // 2. Decodifica il payload (parte Base64Url)
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const payload = JSON.parse(decoded);

    // 3. Verifica presenza campi obbligatori
    if (!payload.sub && !payload.userId) {
      console.warn('⚠️ JWT senza "sub" o "userId"');
    }

    return payload;

  } catch (error) {
    console.error('❌ Errore decodifica token:', error);
    return null; // Non è un JWT valido
  }
}

  /**
   * Recupera il token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Recupera i dati dell'utente
   */
  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Verifica se l'utente è autenticato
   */
  isLoggedIn(): boolean {
   
    // Verifica sia la presenza che la validità del token
    const token = this.getToken();
    if (!token) return false;
    
    // Verifica la scadenza del token (se JWT)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
  

  /**
   * Effettua il logout
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  /**
   * Gestione degli errori di autenticazione
   */
  private handleAuthError(error: any): string {
    let errorMessage = 'Errore durante l\'autenticazione';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore client: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Dati non validi';
          break;
        case 401:
          errorMessage = 'Credenziali non valide';
          break;
        case 403:
          errorMessage = 'Accesso non autorizzato';
          break;
        case 409:
          errorMessage = error.error?.message || 'Utente già registrato';
          break;
        default:
          errorMessage = `Errore ${error.status}: ${error.error?.message || error.statusText}`;
      }
    }
    
    return errorMessage;
  }
}