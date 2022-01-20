import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let request = req;
    console.log('USING INTERCEPTOR');
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `${token}`,
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
    } else {
      request = req.clone({
        setHeaders: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['#/auth/login']);
        }

        return throwError(err);
      })
    );
  }
}
