import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class EventDatabaseService {

  constructor(private http: HttpClient) { }

  addEvent(event: any) {
    return this.http.post('/zecan/api/v1/add-event', event, httpOptions);
  }

  listEvents() {
    return this.http.get('/zecan/api/v1/events');
  }

  deleteEvent(eventId: any) {
    let url = '/zecan/api/v1/delete-event/' + eventId; // url is correct??
    return this.http.delete('/zecan/api/v1/delete-event', httpOptions);
  }

  updateEvent(eventId: any, data: any) {
    let url = '/zecan/api/v1/update-event/' + eventId;
    return this.http.put(url, data, httpOptions);
  }

}
