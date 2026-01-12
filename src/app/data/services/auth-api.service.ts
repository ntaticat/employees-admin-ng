import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginPost, IUserPost } from '../interfaces/user';
import { IUserJwt } from '../interfaces/auth';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: IUserPost): Observable<IUserJwt> {
    const method = `${this.url}/auth/register`;

    return this.http.post<IUserJwt>(method, data, {}).pipe(
      tap((data) => this.saveTokenLocalStorage(data.accessToken))
    );
  }

  login(data: ILoginPost) {
    const method = `${this.url}/auth/login`;

    return this.http.post<IUserJwt>(method, data, {}).pipe(
      tap((data) => this.saveTokenLocalStorage(data.accessToken))
    );
  }

  saveTokenLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }

  readTokenLocalStorage(): string | null {
    return localStorage.getItem("token");
  }

  clearSession() {
    localStorage.clear();
  }

  decodeJWT(token: string) {
    return jwtDecode(token);
  }

  getTokenExpiration() {
    const token = this.readTokenLocalStorage();

    if (!token) {
      return 0;
    }

    const decodedToken = this.decodeJWT(token);
    return decodedToken.exp ?? 0;
  }

  isLoggedIn() {
    const now = Math.floor(Date.now() / 1000);
    const exp = this.getTokenExpiration();

    return now < exp;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
