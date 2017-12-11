import {Component, Input, OnInit, ApplicationRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';
import {PollViewService} from '../services/pollView.service';
import Student from '../models/student';
import {AlertingComponent} from './alerting.component';
import {FlashMessagesService} from 'angular2-flash-messages/module';

import {PollResult, Poll, NotYet, SubjectOffer, DefaultOption} from '../models/poll';


@Component({
  selector: 'app-student-navbar',
  templateUrl: '../templates/student.navbar.template.html',
})

export class StudentNavbarComponent extends AlertingComponent {
  @Input() back = false;

  constructor(public pollViewService: PollViewService,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
