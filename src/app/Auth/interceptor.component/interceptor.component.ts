import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloned = req;

    // 1. Aggiungi il Bearer token se presente
    const token = this.auth.getToken();
    if (token) {
      cloned = cloned.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // 2. Spedisci eventuali cookie (solo se il backend li usa)
    cloned = cloned.clone({
      withCredentials: true      // XHR‑friendly, niente NG02818
    });

    return next.handle(cloned);
  }
}
