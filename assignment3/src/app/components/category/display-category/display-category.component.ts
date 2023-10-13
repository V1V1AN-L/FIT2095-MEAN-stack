import { Component, OnInit } from '@angular/core';
import { CategoryDatabaseService } from '../../../services/category-database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent implements OnInit {
  category: any;

  constructor(
    private categoryService: CategoryDatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the categoryID from the route parameters
    const categoryID = this.route.snapshot.paramMap.get('categoryID');

    // Check if categoryID is null
    if (categoryID) {
      this.categoryService.getCategory(categoryID).subscribe((result: any) => {
        this.category = result;
      });
    } else {
      // Handle the case where categoryID is null, e.g., show an error message or redirect to another page
      console.error("Category ID not provided or invalid.");
      // You can redirect to an error page or handle this case as needed.
    }
  }
}
