import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AlertingComponent} from './alerting.component';


import {CareerService} from '../services/careers.service';
import {AdminService} from '../services/admin.service';
import {PollViewService} from '../services/pollView.service';

import Admin from '../models/admin';
import {Career, Subject} from '../models/career';
import {Poll} from '../models/poll';

@Component({
  selector: 'app-career-list',
  templateUrl: '../templates/career.list.template.html',
})

export class CareerListComponent extends AlertingComponent implements OnInit {
  public polls: Poll[] = [];
  public careers: Career[] = []
  public newPollKey = '';
  public dateFrom: Date;
  public newPoll = {key : '', offer: {}}
  public dateTo: Date;
  public selectedCareer: Career;
  public subjects: Subject[]
  public subjectToAdd
  public loading = false;

  constructor(private route: ActivatedRoute, private careerService: CareerService,
    private adminService: AdminService,
    public pollViewService: PollViewService,
    flashMessagesService: FlashMessagesService) {
      super(flashMessagesService);
  }

  ngOnInit() {
    this.loading = true;
    this.route.params
      .subscribe(params => {
        const id = params['id']
        this.adminService.getPollsById(Number(id)).then(polls => {
          this.polls = polls.reverse();
          this.loading = false;
        });
        this.adminService.getCareersById(Number(id)).then(careers => {
          this.careers = careers
        })
      });
  }

  onChange() {
    this.careerService.getById(this.selectedCareer.shortName).then(career => {
      this.subjects = career.subjects
    })
  }

  onChangeSubject() {
    this.newPoll.offer[this.subjectToAdd.shortName] = []
    console.log(this.newPoll)
  }

  onSubmit() {
    const newPoll = this.selectedCareer.newPoll(this.newPollKey, [], this.dateFrom, this.dateTo);
    this.pollViewService.createPoll(newPoll).then(poll => this.success(`La encuesta fue creada con exito`));
  }
}
