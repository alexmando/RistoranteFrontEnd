import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

 
  private excludedUrls = [
    /\/auth\/login$/,
    /\/auth\/register$/,
    /\/auth\/refresh-token$/
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.auth.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next.handle(cloned);
  }

  return next.handle(req);
  }

  
}