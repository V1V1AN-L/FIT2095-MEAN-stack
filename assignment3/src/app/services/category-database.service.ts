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
    return this.http.get('/api/v1/list-category');
  }

  getCategory(categoryID: string) {
    // Make a GET request to fetch category details by category ID
    const url = `/api/v1/category/${categoryID}`;
    return this.http.get(url);
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
