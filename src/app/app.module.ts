import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {PollViewService} from './services/pollView.service';
import {AdminService} from './services/admin.service';
import {CareerService} from './services/careers.service'
import {StudentService} from './services/students.service'

import {AppComponent} from './app.component';
import {HomeLoginComponent} from './components/home.login.component';
import {PollListComponent} from './components/poll.list.component';
import {PollDetailComponent} from './components/poll.detail.component';
import {AdminComponent} from './components/admin.component'
import {CareerListComponent} from './components/career.list.component'
import {StudentNavbarComponent} from './components/student.navbar.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeLoginComponent,
    PollListComponent,
    PollDetailComponent,
    AdminComponent,
    CareerListComponent,
    StudentNavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: HomeLoginComponent},
      {path: 'students/:fileNumber/polls', component: PollListComponent},
      {path: 'students/:fileNumber/polls/:pollKey', component: PollDetailComponent},
      {path: 'admins/:id', component: AdminComponent}
    ]),
    FlashMessagesModule,
  ],
  providers: [
    FlashMessagesService,
    PollViewService,
    AdminService,
    StudentService,
    CareerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
