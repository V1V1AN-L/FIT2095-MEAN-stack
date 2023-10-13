import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CategoryDatabaseService {
  constructor(private http: HttpClient) { }

  addCategory(category: any) {
    return this.http.post('/api/v1/add-category', category, httpOptions);
  }

  listCategories() {
    return this.http.get('/api/v1/categories');
  }

  // deleteCategory(categoryId: any) {
  //   let url = `/api/v1/delete-category/?categoryId=${categoryId}`;
  //   return this.http.delete(url, httpOptions);
  // }

  // updateCategory(data: any) {
  //   let url = '/api/v1/update-category';
  //   return this.http.put(url, data, httpOptions);
  // }

  // displayCategory(categoryId: any) {
  //   let url = `/api/v1/display-category/?categoryId=${categoryId}`;
  //   return this.http.post(url, httpOptions);
  // }
}
