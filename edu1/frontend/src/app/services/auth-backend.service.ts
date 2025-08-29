import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  success: boolean;
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  testConnection(): Observable<string> {
    return this.http.get(`${this.apiUrl}/test`, { responseType: 'text' });
  }

  logout(): void {
    // Supprimer les données utilisateur du localStorage
    localStorage.removeItem('user');
    console.log('👋 Utilisateur déconnecté');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
