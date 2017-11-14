import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {PollViewService} from './services/pollView.service';
import {AdminService} from './services/admin.service';

import {AppComponent} from './app.component';
import {HomeLoginComponent} from './components/home.login.component';
import {PollListComponent} from './components/poll.list.component';
import {PollDetailComponent} from './components/poll.detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeLoginComponent,
    PollListComponent,
    PollDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: HomeLoginComponent},
      {path: 'students/:fileNumber/polls', component: PollListComponent}
    ]),
    FlashMessagesModule
  ],
  providers: [FlashMessagesService, PollViewService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
