import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  loginRequest,
  RegisterRequest,
  TokenResponse,
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest) {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(response =>
          localStorage.setItem('employees-admin-token', response.accessToken)
        )
      );
  }

  login(data: loginRequest) {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap(response =>
          localStorage.setItem('employees-admin-token', response.accessToken)
        )
      );
  }
}
