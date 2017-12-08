import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PollViewService} from '../services/pollView.service';

import {Subject, Course} from '../models/career';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AlertingComponent} from './alerting.component';

import {PollResult, Poll, NotYet, SubjectOffer, DefaultOption, OfferOption} from '../models/poll';
import {StudentService} from '../services/students.service';
import {AdminService} from '../services/admin.service';
import Admin from '../models/admin';




@Component({
  selector:   'app-poll-admin-detail',
  templateUrl: '../templates/poll.admin.detail.template.html',
})


export class PollAdminDetailComponent extends AlertingComponent implements OnInit {
  public poll: Poll;
  public admin: Admin;
  public multi;
  public pie_view;
  public pie_multi;

  pie_colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  colorScheme = {
    name: 'solar',
    selectable: true,
    group: 'Continuous',
    domain: [
      '#0FCE00', '#4ED200', '#90D500', '#D3D900', '#DDA000', '#E16000', '#E51C00'
    ]
  };

  public view = [900, 200];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Comisiones';
  showYAxisLabel = true;
  yAxisLabel = 'Materias';

  // pie
  pie_showLabels = true;
  pie_explodeSlices = false;
  pie_doughnut = false;
  pie_gradient = false;



  constructor(public pollViewService: PollViewService,
              public studentsService: StudentService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
    this.view = [window.innerWidth, 200];
    this.pie_view = [window.innerWidth, 200];
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
              this.pollViewService.getPoll(key).then(somepoll => {
                  this.poll = somepoll;
                  this.multi = this.offertoChartInfo(this.poll.offer);
                  this.pie_multi = [
                    {'name': 'Listos', 'value': this.poll.studentsFinished},
                    {'name': 'Faltan', 'value': this.poll.career.getStudents() - this.poll.studentsFinished}
                  ];
                });
            });
          });
      });
  }

  onSelect(event) {
    const fullRoute = this.route.snapshot.url.reduce((x, y) => x.concat([y.path]), []);
    this.router.navigate(fullRoute.concat([event.name]));
  }

  offertoChartInfo(offer: Map<Subject, SubjectOffer>) {
    const res = [];
    for (let i = 1; i <= this.maxComision(offer); i += 1) {
      res.push({'name': 'C' + i, 'series': []});
    }
    Array.from(offer).forEach(entry =>
        this.offerOptionstoCharInfo(res, entry[0].shortName , entry[1].options)
    );
    return res;
  }

  offerOptionstoCharInfo(offer, subjectName: string, offerOptions: OfferOption[]) {
    const res = offerOptions.filter(option => option.isCourse()).map(course => course as Course)
    .forEach(course => {
      offer.find(option => option.name === course.id).series
      .unshift({'name': subjectName, 'value' : course.currentStudents / course.maxSlots * 100});
    });
  }

  onResize(event) {
    this.view = [event.target.innerWidth, 200];
    this.pie_view = [event.target.innerWidth, 200];
  }

  private maxComision(offer: Map<Subject, SubjectOffer>) {
    let maxComision = 0;
    Array.from(offer).forEach(entry => {
      maxComision = Math.max(maxComision, entry[1].options.filter(option => option.isCourse()).length);
    });
    return maxComision;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
