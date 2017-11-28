import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {PollViewService} from '../services/pollView.service';

import {Subject, Course} from '../models/career';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AlertingComponent} from './alerting.component';

import {PollResult, Poll, NotYet, SubjectOffer, defaultOptions, DefaultOption, OfferOption} from '../models/poll';
import {StudentService} from '../services/students.service';
import {AdminService} from '../services/admin.service';
import Admin from '../models/admin';




@Component({
  selector:   'app-course-admin-detail',
  templateUrl: '../templates/course.admin.detail.template.html',
})


export class CourseAdminComponent extends AlertingComponent implements OnInit {
  public course: Course;
  public subject: Subject;
  public admin: Admin;
  public multi;

  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  // pie
  view;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;



  constructor(public pollViewService: PollViewService,
              public studentsService: StudentService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
    this.view = [window.innerWidth, 200];
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
                  this.route.params
                  .subscribe(otherparams2 => {
                    const subject = otherparams['subject'];
                    const res = Array.from(somepoll.offer).find(sub => sub[0].shortName === subject);
                    this.subject = res[0];
                    const comision = params['comision'];
                    this.course = res[1].options.filter(option => option.isCourse()).map(course =>
                      course as Course).find(course => course.id === comision);
                    this.multi = [
                      {'name' : 'Anotados', 'value': this.course.currentStudents},
                      {'name' : 'Espacios libres', 'value': this.course.maxSlots - this.course.currentStudents}
                    ];
                  });
                });
            });
          });
      });
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    this.view = [event.target.innerWidth, 200];
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
