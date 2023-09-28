import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  name: string = '';
  description: string = '';
  startDateTime: Date = new Date();
  durationInMinutes: number = 0;
  isActive: boolean = true;
  image: string = '';
  capacity: number = 1000;
  ticketsAvailable: number = 0;
  categories:string = '';

  constructor(private eventDatabaseService: EventDatabaseService, private router: Router) { }

  onSaveEvent() {
    let eventObj = {name: this.name, description: this.description,
      startDateTime: this.startDateTime, durationInMinutes: this.durationInMinutes, isActive: this.isActive,
      image: this.image, capacity: this.capacity, ticketsAvailable: this.ticketsAvailable, categories: this.categories};

    this.eventDatabaseService.addEvent(eventObj).subscribe({
      next:(result: any) => {
       this.router.navigate(['/list-events']);
      },
      error:(error: any) => {
        this.router.navigate(['/invalid-data']);
        console.log(error);
      }}
    );
  }
}
