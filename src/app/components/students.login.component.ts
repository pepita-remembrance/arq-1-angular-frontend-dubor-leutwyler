import {Component} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AlertingComponent} from './alerting.component';

import {StudentService} from '../services/students.service';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-students-login',
  providers: [StudentService],
  templateUrl: '../templates/students.login.template.html',
})

export class StudentsLoginComponent extends AlertingComponent {
  name: string;
  surname: string;
  admin = false;

  constructor(private studentsService: StudentService,
              private router: Router,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  onSubmit() {
    this.studentLogin();
  }

  private studentLogin() {
    this.studentsService.getByName(this.name, this.surname)
      .then(student => {
          if (student) {
            this.router.navigate(['/students', student.fileNumber, 'polls']);
          } else {
            this.alert(`Nombre ${this.name} o apellido ${this.surname} invalidos`);
          }
        }
      );
  }

  private adminLogin() {
    this.adminService.getByName(this.name, this.surname)
      .then(admin => {
          if (admin) {
            this.router.navigate(['/admins', admin.id]);
          } else {
            this.alert(`${this.name} ${this.surname} no es administrador`);
          }
        }
      );
  }
}
