import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

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
      {path: '', redirectTo: '/landing', pathMatch: 'full'},
      {path: 'landing', component: LandingComponent},
      {path: 'careers/:careerShortName/students/login', component: StudentsLoginComponent},
      {path: 'careers/:careerShortName/students/:fileNumber/polls', component: PollListComponent}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
