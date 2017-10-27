import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {StudentService} from '../services/students.service';

@Component({
  selector: 'app-students-login',
  providers: [StudentService],
  templateUrl: '../templates/students.login.template.html',
})

export class StudentsLoginComponent implements OnInit {
  name: string;
  surname: string;
  error: string;
  careerShortName: string;

  constructor(private studentsService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap(params => this.careerShortName = params.get('careerShortName'));
  }

  onSubmit() {
    this.studentsService.getByName(this.name, this.surname)
      .then(student => {
          if (student) {
            this.router.navigate(['careers', this.careerShortName, 'students', student.fileNumber, 'polls']);
          } else {
            this.error = 'Invalid fullName or surname';
          }
        }
      ).catch(error =>
      this.error = 'Invalid fullName or surname'
    );
  }
}
