import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-events',
  templateUrl: './delete-events.component.html',
  styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent {
  eventDB: any[] = [];
  // eventId: any = {};
  constructor(private eventDatabaseService: EventDatabaseService, private router: Router) {
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

  onDeleteEvent(eventID: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      this.eventDatabaseService.deleteEvent(eventID).subscribe({
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

}
