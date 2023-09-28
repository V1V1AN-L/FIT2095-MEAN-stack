import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  eventId: string = '';
  name: string = '';
  capacity: number = 0;
  constructor(private eventDatabaseService: EventDatabaseService, private router: Router) {
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
