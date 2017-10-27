import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing.component';
import {StudentsLoginComponent} from './components/students.login.component';
import {PollListComponent} from './components/poll.list.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    StudentsLoginComponent,
    PollListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/students/login', pathMatch: 'full'},
      {path: 'students/login', component: StudentsLoginComponent},
      {path: 'students/:fileNumber/polls', component: PollListComponent}
    ]),
    FlashMessagesModule
  ],
  providers: [FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
