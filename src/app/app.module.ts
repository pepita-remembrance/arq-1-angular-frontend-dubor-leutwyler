import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/components/common/api';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {PollViewService} from './services/pollView.service';
import {AdminService} from './services/admin.service';
import {CareerService} from './services/careers.service';
import {StudentService} from './services/students.service';

import {AppComponent} from './app.component';
import {HomeLoginComponent} from './components/home.login.component';
import {PollListComponent} from './components/poll.list.component';
import {PollDetailComponent} from './components/poll.detail.component';
import {PollAdminDetailComponent} from './components/poll.admin.detail.component';
import {CourseAdminComponent} from './components/course.admin.component';
import {AdminComponent} from './components/admin.component';
import {CareerListComponent} from './components/career.list.component';
import {StudentNavbarComponent} from './components/student.navbar.component';
import {HeatMapComponentMinMaxComponent} from './components/heatmap_minmax.component';
import {SubjectAdminComponent} from './components/subject.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeLoginComponent,
    PollListComponent,
    PollDetailComponent,
    PollAdminDetailComponent,
    CourseAdminComponent,
    AdminComponent,
    CareerListComponent,
    StudentNavbarComponent,
    HeatMapComponentMinMaxComponent,
    SubjectAdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgxChartsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: HomeLoginComponent},
      {path: 'students/:fileNumber/polls', component: PollListComponent},
      {path: 'students/:fileNumber/polls/:careerKey/:pollKey', component: PollDetailComponent},
      {path: 'admins/:id', component: AdminComponent},
      {path: 'admins/:id/polls/:careerKey/:pollKey', component: PollAdminDetailComponent},
      {path: 'admins/:id/polls/:careerKey/:pollKey/:subject', component: SubjectAdminComponent},
    ]),
    FlashMessagesModule,
  ],
  providers: [
    FlashMessagesService,
    PollViewService,
    AdminService,
    StudentService,
    HttpClient,
    CareerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
