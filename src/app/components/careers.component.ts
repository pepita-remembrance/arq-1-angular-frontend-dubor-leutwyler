import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule, Location } from "@angular/common";

import 'rxjs/add/operator/switchMap';

import { Career } from '../models/course'
import Student from '../models/student'
import {StudentsService} from '../services/students.service'

@Component({
  selector: 'careers',
  providers: [StudentsService],
  templateUrl: '../templates/careers.template.html',
})

export class CareersComponent implements OnInit{
  student : Student

  constructor(private studentsService: StudentsService, private route: ActivatedRoute,
  private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.studentsService.getStudent(+params.get('id')))
      .subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }
}
