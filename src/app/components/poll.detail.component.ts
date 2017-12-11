import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PollViewService} from '../services/pollView.service';

import {Subject, Course} from '../models/career';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AlertingComponent} from './alerting.component';

import {PollResult, Poll, NotYet, SubjectOffer, DefaultOption} from '../models/poll';
import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';



@Component({
  selector:   'app-poll-detail',
  templateUrl: '../templates/poll.detail.template.html',
})


export class PollDetailComponent extends AlertingComponent implements OnInit {
  public arrayOffer: [string, SubjectOffer][] = [];
  public arrayOfferConst: [Subject, SubjectOffer][] = [];
  public pollResult: PollResult;
  public poll: Poll;
  public defaultOptions;
  public defaultOption;
  public key
  public careerKey

  constructor(public pollViewService: PollViewService,
              public studentsService: StudentService,
              public careerService : CareerService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
    this.defaultOptions = SubjectOffer.defaultOffer();
    this.defaultOption = SubjectOffer.defaultOffer()[0];
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const fileNumber = params['fileNumber'];
        this.key = params['pollKey'];
        this.careerKey = params['careerKey']
        this.studentsService.getById(parseInt(fileNumber, 10))
          .then(student => {
            this.careerService.getForAdmin(student.careers.map(career => career.shortName)).then(careers => {
              this.pollViewService.getPoll(this.careerKey ,this.key).then(somepoll => {
                this.pollViewService.student = student;
                this.pollViewService.careers = careers;
                this.poll = somepoll;
                this.pollViewService.getPollResult(this.careerKey, this.key);
                for(var p in this.poll.offer) {
                  this.arrayOffer.push([p, this.poll.offer[p]])
                }
              });
            })
          });
      });
  }

  changeDefault(option) {
    this.defaultOption = option;
    for(var p in this.pollViewService.pollResult.results){
      if (option !== this.pollViewService.originalResults[p]) {
        this.pollViewService.pollResult.results[p] = option
        this.pollViewService.submitResults[p] = option;
      }else {
        delete this.pollViewService.submitResults[p];
      }
    }
  }

  select(subject, option) {
    if (option !== this.pollViewService.originalResults[subject]) {
      this.pollViewService.submitResults[subject] = option;
    } else {
      delete this.pollViewService.submitResults[subject];
    }
    this.pollViewService.pollResult.results[subject] = option;
    this.ref.tick();
  }

  isSelected(subject, option) {
    return this.pollViewService.pollResult && this.pollViewService.pollResult.results[subject] &&
    this.getText(this.pollViewService.pollResult.results[subject]) === this.getText(option);
  }

  submit() {
    this.pollViewService.submit(this.careerKey, this.key).then(result => this.router
      .navigate(['students', `${this.pollViewService.student.fileNumber}`, 'polls']));
  }

  getText(option) {
    if(!option.isCourse) {
      return option.key
    }else {
      return `${option.key}:
      ${this.schedulesToText(option.schedules)}`
    }
  }

  schedulesToText(schedules : {day: number, fromHour: number, toHour: number,
    fromMinutes: number, toMinutes: number}[]) {
    var res = ""
    schedules.forEach(schedule => {
      res +=
      `${this.day(schedule.day)} ${schedule.fromHour}:` +
      `${(schedule.fromMinutes < 10 ? '0' : '')}${schedule.fromMinutes} a ` +
      `${schedule.toHour}:` +
      `${(schedule.toMinutes < 10 ? '0' : '')}${schedule.toMinutes};`
    })
    return res
  }

  day(n : number){
    if(n === 0) {
      return "Lunes"
    }
    if(n === 1) {
      return "Martes"
    }
    if(n === 2) {
      return "Miercoles"
    }
    if(n === 3) {
      return "Jueves"
    }
    if(n === 4) {
      return "Viernes"
    }
    if(n === 5) {
      return "Sabado"
    }
    if(n === 6) {
      return "Domingo"
    }
  }

}
