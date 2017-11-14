import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {PollViewService} from './services/pollView.service';

import {AppComponent} from './app.component';
import {StudentsLoginComponent} from './components/students.login.component';
import {PollListComponent} from './components/poll.list.component';
import {PollDetailComponent} from './components/poll.detail.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsLoginComponent,
    PollListComponent,
    PollDetailComponent
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
  providers: [FlashMessagesService, PollViewService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
