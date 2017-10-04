import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CareersService}  from './services/careers.service'

import { AppComponent } from './app.component';
import { CareersComponent } from './components/careers.component'
import { StudentsComponent } from './components/students.login.component'

import { RouterModule }   from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CareersComponent,
    StudentsComponent
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
        path: 'students/:id',
        component: CareersComponent
      },
      {
        path: 'login',
        component: StudentsComponent
      }
    ])
  ],
  providers: [CareersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
