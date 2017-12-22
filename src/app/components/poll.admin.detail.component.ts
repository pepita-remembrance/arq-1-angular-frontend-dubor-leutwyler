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
  loading = true


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

  public view = [900, 1000];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Opciones';
  showYAxisLabel = true;
  yAxisLabel = 'Materias';

  // pie
  pie_showLagend = true;
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
    this.view = [window.innerWidth, 1000];
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        const key = params['pollKey'];
        const careerKey = params['careerKey'];
        this.adminService.getById(parseInt(id, 10))
          .then(admin => {
            this.admin = admin;
            this.pollViewService.getPoll(careerKey, key).then(somepoll => {
              this.poll = somepoll;
              this.adminService.getCareersById(id).then(careers => {
                const students = Array.from(careers).find(c => c.shortName === careerKey).students
                this.adminService.getPollsById(id).then(polls => {
                  this.poll.answered = Array.from(polls).find(p => p.key === key).answered
                  this.pie_view = [window.innerWidth, 200];
                  this.pie_multi = [
                    {"name" : "Listos", "value" : this.poll.answered},
                    {"name" : "Faltan", "value" : students - this.poll.answered}
                  ];
                })
              })
              this.adminService.getTally(careerKey, key).then(offer => {
                this.multi = this.offertoChartInfo(offer, this.poll.offer)
                this.loading = false
              })
              this.view = [window.innerWidth, Object.keys(this.poll.offer).length * 30 ];
            });
          });
      });
  }

  onSelect(event) {
    const fullRoute = this.route.snapshot.url.reduce((x, y) => x.concat([y.path]), []);
    this.router.navigate(fullRoute.concat([event.name]));
  }

  onSelectPie(event) {
  }

  offertoChartInfo(offer, completeOffer) {
    const res = [];
    for (let i = 1; i <= this.maxComision(completeOffer); i += 1) {
      res.push({'name': 'C' + i, 'series': []});
    }
    res.push({'name': 'Ningun horario me sirve', series: []})
    res.push({'name': 'Voy a cursar TTI segun oferta del Departamento de Ciencia y Tecnologia', series: []})
    res.push({'name': 'Voy a cursar TTU segun oferta del Departamento de Ciencia y Tecnologia', series: []})
    res.push({'name': 'Voy a rendir libre', series: []})
    offer.forEach(op => this.offerOptionstoCharInfo(res, op.subject.shortName, op.options))
    for(var entry in completeOffer) {
      completeOffer[entry].filter(op => op.isCourse).forEach(course => {
        const partialRes = res.find(r => r.name === course.key)
        if(!partialRes.series.find(r => r['name'] === entry)){
            partialRes.series.unshift({'name': entry, 'value': 0})
        }
      })
    }
    return res;
  }

  offerOptionstoCharInfo(offer, subjectName: string, offerOptions) {
    const res = offerOptions.filter(op => op.option.key != 'Ya aprobe' && op.option.key != 'No voy a cursar')
    .forEach(course => {
      offer.find(option => option.name === course.option.key).series
      .unshift({'name': subjectName, 'value' : Number(course.students.length) / (course.option.quota ? Number(course.option.quota) : 30) * 100});
    });
  }

  onResize(event) {
    this.view = [event.target.innerWidth, this.view[1]];
    this.pie_view = [event.target.innerWidth, 200];
  }

  private maxComision(offer: Map<Subject, SubjectOffer>) {
    let maxComision = 0;
    for(var entry in offer) {
        let currComisions = 0
        offer[entry].forEach(option => {
            currComisions = currComisions + (option.isCourse ? 1 : 0)
        })
        maxComision = Math.max(maxComision, currComisions);
    }
    return maxComision;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}
