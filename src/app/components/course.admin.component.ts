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
  selector:   'app-course-admin-detail',
  templateUrl: '../templates/course.admin.detail.template.html',
})


export class CourseAdminComponent extends AlertingComponent implements OnInit {
  @Input() public course: Course;
  @Input() public admin: Admin;
  @Input() public subject: Subject;
  @Input() public courses: number;
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
    this.view = [400, 300];
  }

  ngOnInit() {
      this.multi = [
        {'name' : 'Anotados', 'value': this.course.currentStudents},
        {'name' : 'Espacios libres', 'value': this.course.maxSlots - this.course.currentStudents}
      ];
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    this.view = [event.window.innerWidth / this.courses, 300];
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
