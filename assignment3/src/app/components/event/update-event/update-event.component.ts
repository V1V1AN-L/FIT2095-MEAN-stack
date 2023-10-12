import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  eventDB: any[] = [];
  eventId: string = '';
  name: string = '';
  capacity: number | null = null;
  updateFlag: boolean = false;

  constructor(private eventDatabaseService: EventDatabaseService, private router: Router) {
    this.showEvents();
    this.updateFlag = false;

  }
  showEvents() {
    this.eventDatabaseService.listEvents().subscribe({

      next:(result: any) => {
        this.eventDB = result;
      },
      error:(error: any) => {
        console.log(error);
      }}
    );
  }

  selectEvent(eventId: any) {
    this.eventId = eventId;
    this.updateFlag = true;
  }

  onUpdateEvent() {
    let eventObj = {eventId: this.eventId, name: this.name, capacity: this.capacity};
    this.eventDatabaseService.updateEvent(eventObj).subscribe({
      next:(result: any) => {
        this.router.navigate(['/list-events']);
        console.log(result); // need to redirect to display event page - will add later
      },
      error:(error: any) => {
        this.router.navigate(['/invalid-data']);
        console.log(error);
      }}
    );
  }


}
