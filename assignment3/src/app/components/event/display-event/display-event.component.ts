import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent {
  eventId: string = '';
  event: any = {};

  constructor(private eventDatabaseService: EventDatabaseService, private router: Router) {
    this.eventId = this.eventDatabaseService.eventId;
    this.onDisplayEvent();
  }

  onDisplayEvent() {
    this.eventDatabaseService.displayEvent(this.eventId).subscribe({
      next:(result: any) => {
        this.event = result;
        },
      error:(error: any) => {
        this.router.navigate(['/invalid-data']);
        console.log(error);
      }}
    );
  }

}
