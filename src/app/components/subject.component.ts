import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PollViewService} from '../services/pollView.service';

import {Subject, Course} from '../models/career';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AlertingComponent} from './alerting.component';

import {PollResult, Poll, NotYet, SubjectOffer, DefaultOption, OfferOption} from '../models/poll';
import {CareerService} from '../services/careers.service';
import {AdminService} from '../services/admin.service';
import Admin from '../models/admin';




@Component({
  selector:   'app-subject-admin-detail',
  templateUrl: '../templates/subject.admin.detail.template.html',
})


export class SubjectAdminComponent extends AlertingComponent implements OnInit {
  public subject: Subject;
  public admin: Admin;
  public courses: Course[];
  public rowSize: number;
  public length: number;


  constructor(public pollViewService: PollViewService,
              public careerService: CareerService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        this.adminService.getById(parseInt(id, 10))
          .then(admin => {
            this.admin = admin;
            this.route.params
            .subscribe(otherparams => {
              const key = otherparams['pollKey'];
              const careerKey = otherparams['careerKey'];
              this.pollViewService.getPoll(careerKey, key).then(somepoll => {
                  this.route.params
                  .subscribe(otherparams2 => {
                    const subject = otherparams['subject'];
                    const res = Array.from(somepoll.offer).find(sub => sub[0].shortName === subject);
                    this.subject = res[0];
                    this.courses = res[1].options.filter(option => option.isCourse()).map(course => course as Course);
                    this.rowSize = 12 / this.courses.length;
                    length = this.courses.length;
                  });
                });
            });
          });
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
