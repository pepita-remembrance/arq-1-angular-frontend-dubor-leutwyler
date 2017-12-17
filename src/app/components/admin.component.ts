import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {StudentService} from '../services/students.service';
import {AdminService} from '../services/admin.service';

import Admin from '../models/admin';


@Component({
  selector: 'app-admin',
  templateUrl: '../templates/admin.template.html',
})

export class AdminComponent implements OnInit {
  public admin: Admin;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private adminService: AdminService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = params['id']
        this.adminService.getById(Number(id))
          .then(admin => {
            this.admin = admin;
          })
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
