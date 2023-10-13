import { Component } from '@angular/core';
import { CategoryDatabaseService } from '../../../services/category-database.service'; // Import your category service
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  name: string = '';
  description: string = '';

  constructor(private categoryService: CategoryDatabaseService, private router: Router) { }

  onSaveCategory() {
    const categoryObj = {
      name: this.name,
      description: this.description
    };

    this.categoryService.addCategory(categoryObj).subscribe({
      next: (result: any) => {
        this.router.navigate(['/list-categories']); // Redirect to the "List Categories" component
      },
      error: (error: any) => {
        this.router.navigate(['/invalid-data']); // Redirect to the "Invalid Data" component
        console.log(error);
      }
    });
  }
}
