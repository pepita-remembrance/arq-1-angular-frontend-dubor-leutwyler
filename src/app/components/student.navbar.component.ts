import {Component, OnInit, ApplicationRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';
import {PollViewService} from '../services/pollView.service';
import Student from '../models/student';
import {AlertingComponent} from './alerting.component';
import {FlashMessagesService} from 'angular2-flash-messages/module';

import {PollResult, Poll, NotYet, SubjectOffer, defaultOptions, DefaultOption} from '../models/poll';


@Component({
  selector: 'app-student-navbar',
  templateUrl: '../templates/student.navbar.template.html',
})

export class StudentNavbarComponent extends AlertingComponent {

  constructor(public pollViewService: PollViewService,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
