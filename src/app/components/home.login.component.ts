import {Component} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AlertingComponent} from './alerting.component';

import {StudentService} from '../services/students.service';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-home-login',
  providers: [StudentService],
  templateUrl: '../templates/home.login.template.html',
})

export class HomeLoginComponent extends AlertingComponent {
  name: string;
  surname: string;
  admin = false;
  loading = false

  constructor(private studentsService: StudentService,
              private router: Router,
              private adminService: AdminService,
              flashMessagesService: FlashMessagesService) {
    super(flashMessagesService);
  }

  onSubmit() {
    if (this.admin) {
      this.adminLogin();
    } else {
      this.studentLogin();
    }
  }

  private studentLogin() {
    this.loading = true
    this.studentsService.getByName(this.name, this.surname)
      .then(student => {
        this.loading = false
        if (student) {
          this.router.navigate(['/students', student.fileNumber, 'polls']);
        } else {
          this.alert(`Nombre ${this.name} o apellido ${this.surname} invalidos`);
        }
      });
  }

  private adminLogin() {
    this.loading = true
    this.adminService.getByName(this.name, this.surname)
      .then(admin => {
        this.loading = false
        if (admin) {
          this.router.navigate(['/admins', admin.fileNumber]);
        } else {
          this.alert(`${this.name} ${this.surname} no es administrador`);
        }
      })
      .catch(error => console.log(error));
  }

  seed() {
    this.loading = true
    this.adminService.seed()
    .then(x => {
      this.success(`Datos creados`);
      this.loading = false
    })
    .catch(error => {
      this.success(`Datos creados`);
      this.loading = false
    })
  }
}
