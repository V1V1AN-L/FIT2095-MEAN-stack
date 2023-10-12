import { Component } from '@angular/core';
import{Router} from "@angular/router";


@Component({
  selector: 'app-invalid-data',
  templateUrl: './invalid-data.component.html',
  styleUrls: ['./invalid-data.component.css']
})
export class InvalidDataComponent {
  constructor(private router: Router) {
  }

  returnHome() {
    this.router.navigate(['/list-events']);
  }


}
