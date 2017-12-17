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
  @Input() public studentsPerCourse: Map<string, any[]>;
  public multi;

  colorScheme = {
    domain: ['#A10A28', '#5AA454']
  };

  // pie
  view = [1, 1]
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;

  occupied


  constructor(public pollViewService: PollViewService,
              public studentsService: StudentService,
              private ref: ApplicationRef,
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  ngOnInit() {
    console.log(this.studentsPerCourse)
    this.view = [window.innerWidth, 400]
    this.occupied =
    this.studentsPerCourse.get(this.course.key) ? this.studentsPerCourse.get(this.course.key).length : 0;
    this.multi = [
      {'name' : 'Anotados', 'value': this.occupied},
      {'name' : 'Espacios libres', 'value': this.course.quota - this.occupied}
    ];
  }

  students(){
    return this.studentsPerCourse.get(this.course.key)
  }

  onSelect(event) {
  }

  onResize() {
    this.view = [window.innerWidth, 400]
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
