import {Component} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import Student from '../models/student';

@Component({
  selector: 'app-students-login',
  providers: [StudentsService],
  templateUrl: '../templates/students.login.template.html',
})

export class StudentsComponent implements OnInit {
  students: Student[];
  name: string;
  surname: string;
  error: string;

  ngOnInit(): void {
    this.loadStudents();
  }

  constructor(private studentsService: StudentsService,
              private route: ActivatedRoute,
              private router: Router, ) {
  }

  loadStudents(): void {
    this.studentsService.getStudents().then(students => this.students = students);
  }

  onSubmit() {
    this.studentsService.getStudentBy(this.name, this.surname)
      .then(student => {
          if (student) {
            this.router.navigate([`students/${student.id}`]);
          } else {
            this.error = 'Invalid fullName or surname';
          }
        }
      ).catch(error =>
      this.error = 'Invalid fullName or surname'
    );
  }
}
