import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';
import {AdminService} from '../services/admin.service'

import Admin from '../models/admin'


@Component({
  selector: 'app-admin',
  templateUrl: '../templates/admin.template.html',
})

export class AdminComponent implements OnInit {
  private admin : Admin

  constructor(private route : ActivatedRoute, private studentService : StudentService,
  private adminService: AdminService, private careerService : CareerService) {

  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => params.get('id'))
      .subscribe(id =>
        this.adminService.getById(parseInt(id, 10))
          .then(admin => {
            this.admin = admin;
          })
      );
  }
}
