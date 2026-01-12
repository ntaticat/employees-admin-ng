import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isAuthRequest =
      request.url.includes('auth/login') ||
      request.url.includes('auth/register');


    if(isAuthRequest && request.method === "POST") {
      return next.handle(request).pipe()
    }

    const token = localStorage.getItem("token");

    if(token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem("token");
          this.router.navigate(["/", "auth"]);
        }
        return throwError(() => err);
      })
    );
  }
}
