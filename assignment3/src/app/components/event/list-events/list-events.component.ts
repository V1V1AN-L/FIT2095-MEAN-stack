import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  eventDB: any[] = [];
  constructor(private  eventDatabaseService: EventDatabaseService) {
  }
  showEvents() {
    this.eventDatabaseService.listEvents().subscribe(
      (result: any) => {
        this.eventDB = result;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
