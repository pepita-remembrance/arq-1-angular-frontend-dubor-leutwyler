import {Component, OnInit, ApplicationRef} from '@angular/core';
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
  selector: 'app-poll-list',
  templateUrl: '../templates/poll.list.template.html',
})

export class PollListComponent extends AlertingComponent implements OnInit {
  loading = true

  constructor(private studentsService: StudentService,
              public pollViewService: PollViewService,
              public careerService: CareerService,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const fileNumber = params['fileNumber']
      this.studentsService.getById(parseInt(fileNumber, 10))
        .then(student => {
          this.loading = false
          this.pollViewService.student = student;
          this.pollViewService.polls = student.polls.reverse();
        })
      });
  }

  active(poll) {
    return poll.isOpen &&
    this.pollViewService &&
    this.pollViewService.student &&
    this.pollViewService.student.pollResults &&
    this.pollViewService.student.pollResults.find(somepoll => somepoll.poll.key === poll.key);
  }

  activePolls(career) {
    return career.polls.filter(poll => poll.isOpen);
  }

  tip(poll) {
    if (this.active(poll)) {
      return 'Ya fue completada; Presione para editar';
    }
    return 'Debe completar esta encuesta; Presione para continuar';
  }
}
