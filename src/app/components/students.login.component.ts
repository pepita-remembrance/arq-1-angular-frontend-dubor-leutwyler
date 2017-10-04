import { Component } from '@angular/core';
import {StudentsService} from '../services/students.service';
import { OnInit } from '@angular/core';
import { CommonModule, Location } from "@angular/common";


import Student from '../models/student'

@Component({
  selector: 'students-login',
  providers: [StudentsService],
  templateUrl: '../templates/students.login.template.html',
})

export class StudentsComponent {
  title = 'app';
  students : Student[];

  ngOnInit(): void {
    this.getCarrers();
  }

  constructor(private studentsService: StudentsService, private location : Location) {}

  getCarrers() : void{
    this.studentsService.getStudents().then(students => this.students = students);
  }

  select(student : Student) : void {
    this.studentsService.student = student
    this.location.go('/students')
  }
}
