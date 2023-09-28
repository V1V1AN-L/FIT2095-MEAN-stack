import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  eventDB: any[] = [];
  constructor(private  eventDatabaseService: EventDatabaseService, private router: Router) {
    this.showEvents();
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

  viewEvent(eventId: any) {
    this.eventDatabaseService.eventId = eventId;
    this.router.navigate(['/display-event']);
  }
}
