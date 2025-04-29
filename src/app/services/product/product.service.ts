import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://127.0.0.1:8000/api/products'; // 🔥 adapte si besoin
  http=inject(HttpClient);
  
  constructor() {}

  // 📦 Obtenir la liste des produits
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  // 📦 Obtenir un seul produit par ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  // 📦 Créer un produit
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  // 📦 Modifier un produit
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  // 📦 Supprimer un produit
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
