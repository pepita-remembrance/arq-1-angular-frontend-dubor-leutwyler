import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// import {CareersService} from './services/careers.service';

import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing.component';
// import {StudentsLoginComponent} from './components/students.login.component';

import {RouterModule} from '@angular/router';
// import {StudentsService} from './services/students.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
    // StudentsLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/landing', pathMatch: 'full'},
      {path: 'landing', component: LandingComponent}
    ], {useHash: true})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
