import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { ListEventsComponent } from './components/event/list-events/list-events.component';
import { DeleteEventsComponent } from './components/event/delete-events/delete-events.component';
import { DisplayEventComponent } from './components/event/display-event/display-event.component';
import { UpdateEventComponent } from './components/event/update-event/update-event.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {EventDatabaseService} from "./services/event-database.service";
import {FormsModule} from "@angular/forms";
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ShowStatisticComponent } from './components/event/show-statistic/show-statistic.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransformMinutePipe } from './pipes/transform-minute.pipe';

const routes: Routes = [
  {path: 'add-event', component: AddEventComponent},
  {path: 'list-events', component: ListEventsComponent},
  {path: 'delete-events', component: DeleteEventsComponent},
  {path: 'display-event', component: DisplayEventComponent},
  {path: 'update-event', component: UpdateEventComponent},
  {path: 'invalid-data', component: InvalidDataComponent},
  {path: 'show-statistic', component: ShowStatisticComponent},
  {path: '*', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ListEventsComponent,
    DeleteEventsComponent,
    DisplayEventComponent,
    UpdateEventComponent,
    InvalidDataComponent,
    ShowStatisticComponent,
    PageNotFoundComponent,
    TransformMinutePipe
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, {useHash: true}), HttpClientModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [EventDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
