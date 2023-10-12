import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

/**
 * EventDatabaseService is responsible for handling events in the application.
 * It provides methods for adding, listing, deleting, updating, displaying, and retrieving statistics for events.
 */

@Injectable({
  providedIn: 'root'
})
export class EventDatabaseService {

  constructor(private http: HttpClient) { }

  eventId: string = '';


  addEvent(event: any) {
    return this.http.post('/zecan/api/v1/add-event', event, httpOptions);
  }


  listEvents() {
    return this.http.get('/zecan/api/v1/events');
  }

  deleteEvent(eventId: any) {
    let url = '/zecan/api/v1/delete-event/?eventId=' + eventId;
    return this.http.delete(url, httpOptions);
  }

  updateEvent(data: any) {
    let url = '/zecan/api/v1/update-event/';
    return this.http.put(url, data, httpOptions);
  }

  displayEvent(eventId: any) {
    let url = '/zecan/api/v1/display-event/?eventId=' + eventId;
    return this.http.post(url,httpOptions);
  }

  showStatistic() {
    return this.http.get('/zecan/api/v1/counter');
  }

}
