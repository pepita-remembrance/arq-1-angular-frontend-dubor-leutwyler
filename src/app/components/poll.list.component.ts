import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';
import Student from '../models/student';
import {AlertingComponent} from './alerting.component';
import {FlashMessagesService} from 'angular2-flash-messages/module';

import {PollResult} from '../models/poll'
import {tpi2017s2} from '../models/mocks/poll.mock'

@Component({
  selector: 'app-poll-list',
  providers: [StudentService, CareerService],
  templateUrl: '../templates/poll.list.template.html',
})

export class PollListComponent extends AlertingComponent implements OnInit {
  public student: Student;
  public poll: PollResult

  constructor(private studentsService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap(params => params.get('fileNumber'))
      .subscribe(fileNumber =>
        this.studentsService.getById(parseInt(fileNumber, 10))
          .then(student => {
            this.student = student
            this.poll = new PollResult(tpi2017s2, student)
            console.log(this.poll)
          })
      );
  }

}
