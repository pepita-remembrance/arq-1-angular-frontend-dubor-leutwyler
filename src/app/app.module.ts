import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CareersService} from './services/careers.service';

import {AppComponent} from './app.component';
import {StudentsLoginComponent} from './components/students.login.component';

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    StudentsLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: StudentsLoginComponent
      }
    ])
  ],
  providers: [CareersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
