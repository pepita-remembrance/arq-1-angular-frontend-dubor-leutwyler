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
  public studentsPerCourse: Map<string, any[]> = new Map()
  public vistaDeCursos = false
  public summarySingle : any[] = []
  loading = true

  view = [1, 1]
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;

  colorScheme = {
    domain: []
  };


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
    this.view = [window.innerWidth, 400]
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        const key = params['pollKey'];
        const subject = params['subject'];
        const careerKey = params['careerKey'];
        this.adminService.getById(parseInt(id, 10))
          .then(admin => {
            this.admin = admin;
            this.pollViewService.getPoll(careerKey, key).then(somepoll => {
              let res;
              for(var entry in somepoll.offer){
                if(entry === subject){
                  somepoll.offer[entry].forEach(op => {
                    this.summarySingle.push({'name' : op.key, 'value' : 0})
                    this.colorScheme.domain.push(this.getRandomColor())
                  })
                  res = [entry, somepoll.offer[entry]]
                  break;
                }
              }
              this.adminService.getTally(careerKey, key).then(otherpoll => {
                Array.from(otherpoll).find(p => p['subject'].shortName === subject)['options']
                .forEach(course => {
                  this.studentsPerCourse.set(course.option.key, course.students)
                  this.summarySingle.find(op => op.name === course.option.key).value += course.students.length
                })
                this.subject = res[0];
                this.courses = []
                res[1].forEach(option => {
                  if(option.isCourse === true) {
                    this.courses.push(option)
                  }
                });
                this.rowSize = 12 / this.courses.length;
                this.length = this.courses.length;
                this.loading = false
              })
            });
          });
      });
  }

  onSelect(event){
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  students(){
    const res = []
    Array.from(this.studentsPerCourse).forEach(pair => pair[1].forEach(student => {
      res.push({option: pair[0], student: student})
    }))
    return Array.from(res)
  }

  private getRandomColor() {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }
}
