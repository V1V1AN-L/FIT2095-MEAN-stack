import { Component, OnInit } from '@angular/core';
import { CategoryDatabaseService } from '../../../services/category-database.service'; // Import your category service
import { Router } from '@angular/router'; // Import the Angular Router module

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryDatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.listCategories().subscribe((result: any) => {
      this.categories = result;
    });
  }

  viewCategory(categoryId: any) {
    // Redirect to the "View Category" component by category ID
    this.router.navigate(['/display-category', categoryId]);
  }
}
