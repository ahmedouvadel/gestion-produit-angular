import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://127.0.0.1:8000/api/users';
  private http = inject(HttpClient);

  constructor() {}

  // Obtenir tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
