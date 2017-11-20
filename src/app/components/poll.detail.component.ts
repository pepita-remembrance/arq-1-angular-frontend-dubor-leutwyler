import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PollViewService} from '../services/pollView.service';

import {Subject} from '../models/career';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AlertingComponent} from './alerting.component';

import {PollResult, Poll, NotYet, SubjectOffer, defaultOptions, DefaultOption} from '../models/poll';
import {StudentService} from '../services/students.service';



@Component({
  selector:   'app-poll-detail',
  templateUrl: '../templates/poll.detail.template.html',
})


export class PollDetailComponent extends AlertingComponent implements OnInit {
  public arrayOffer: [Subject, SubjectOffer][];
  public arrayOfferConst: [Subject, SubjectOffer][];
  public pollResult: PollResult;
  public poll: Poll;
  public defaultOptions: DefaultOption[];
  public defaultOption: DefaultOption;

  constructor(public pollViewService: PollViewService,
              public studentsService: StudentService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
    this.defaultOptions = defaultOptions;
    this.defaultOption = defaultOptions[0];
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const fileNumber = params['fileNumber']
        this.studentsService.getById(parseInt(fileNumber, 10))
          .then(student => {
            this.pollViewService.student = student;
            this.route.params
            .subscribe(params => {
              const key = params['pollKey']
              this.pollViewService.getPoll(key).then(somepoll => {
                  this.poll = somepoll;
                });
              this.pollViewService.getPollResult(key);
            })
          })
      });
  }

  changeDefault(option) {
    this.defaultOption = option;
    this.pollViewService.pollResult.arrayResults.forEach(res => {
      res[1] = option;
      this.pollViewService.pollResult.results.set(res[0], option);
    });
  }

  select(subject, option) {
    if (option.text !== this.pollViewService.originalResults.get(subject).text) {
      this.pollViewService.submitResults.set(subject, option);
    } else {
      this.pollViewService.submitResults.delete(subject);
    }
    this.pollViewService.pollResult.results.set(subject, option);
    this.ref.tick();
  }

  isSelected(subject, option) {
    return this.pollViewService.pollResult && this.pollViewService.pollResult.results.get(subject) &&
    this.pollViewService.pollResult.results.get(subject).text === option.text;
  }

  submit() {
    this.pollViewService.submit().then(student => this.router.navigate(['students', `${student.fileNumber}`, 'polls']));
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
