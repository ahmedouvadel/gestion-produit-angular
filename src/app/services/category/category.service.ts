import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://127.0.0.1:8000/api/categories'; 
  private http = inject(HttpClient);

  constructor() {}

  // Obtenir toutes les catégories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }

  // Obtenir une seule catégorie
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`);
  }

  // Créer une nouvelle catégorie
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.API_URL, category);
  }

  // Modifier une catégorie
  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.API_URL}/${id}`, category);
  }

  // Supprimer une catégorie
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
