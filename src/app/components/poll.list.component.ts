import {Component, OnInit, ApplicationRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';
import {PollViewService} from '../services/pollView.service';
import Student from '../models/student';
import {AlertingComponent} from './alerting.component';
import {FlashMessagesService} from 'angular2-flash-messages/module';

import {PollResult, Poll, NotYet, SubjectOffer, DefaultOption} from '../models/poll'


@Component({
  selector: 'app-poll-list',
  providers: [StudentService, CareerService],
  templateUrl: '../templates/poll.list.template.html',
})

export class PollListComponent extends AlertingComponent implements OnInit {
  public student: Student;
  public pollResult: PollResult
  public poll: Poll
  public defaultOptions : DefaultOption[]
  public defaultOption : DefaultOption

  constructor(private studentsService: StudentService,
              public pollViewService : PollViewService,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
    this.defaultOptions = SubjectOffer.defaultOptions
    this.defaultOption = this.defaultOptions[0]
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap(params => params.get('fileNumber'))
      .subscribe(fileNumber =>
        this.studentsService.getById(parseInt(fileNumber, 10))
          .then(student => {
            this.student = student
            this.pollViewService.activePoll().subscribe(somepoll =>{
                this.poll = somepoll
              })
            this.pollViewService.getActivePollResult(this.student)
          })
      );
  }

  changeDefault(option){
    this.pollViewService.pollResult.arrayResults.forEach(res => {
      res[1] = option
      this.pollViewService.pollResult.results.set(res[0], option)
    })
  }
}
