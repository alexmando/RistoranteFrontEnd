import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Verifica lo stato iniziale al caricamento del servizio
    this.checkToken();
  }

   // Verifica presenza token valido
  private checkToken(): void {
    const token = localStorage.getItem('auth_token');
    this.loggedInSubject.next(!!token);
  }

   // Metodo pubblico per verificare lo stato di login
  isLoggedIn(): boolean { 
    return this.loggedInSubject.value;
  }

  // Observable per chi vuole sottoscrivere lo stato
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

   login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  get currentUserValue() {
    return this.loggedInSubject.value;
  }

  register(user: any): Observable<any> {
  return this.http.post(`${this.API_URL}/register`, user);
}
}
