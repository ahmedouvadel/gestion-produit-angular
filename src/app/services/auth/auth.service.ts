import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000/api'; // 🔥 mets ton URL backend ici

  http=inject(HttpClient);

  constructor() {}

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, { name, email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {});
  }

  saveToken(response: { access_token: string }) {
    localStorage.setItem('access_token', response.access_token);
  }


  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
