import { Component } from '@angular/core';
import {EventDatabaseService} from "../../../services/event-database.service";
@Component({
  selector: 'app-show-statistic',
  templateUrl: './show-statistic.component.html',
  styleUrls: ['./show-statistic.component.css']
})
export class ShowStatisticComponent {
  recordsCreated: number = 0;
  recordsUpdated: number = 0;
  recordsDeleted: number = 0;
  constructor(private eventDatabase: EventDatabaseService) {
    this.showStats();
  }

  showStats(): void {
    this.eventDatabase.showStatistic().subscribe({
      next: (result: any) => {
        this.recordsCreated = result.addCount;
        this.recordsUpdated = result.updateCount;
        this.recordsDeleted = result.deleteCount;
      }
    });
  }
}
