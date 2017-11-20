import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {CareerService} from '../services/careers.service';
import {AdminService} from '../services/admin.service';

import Admin from '../models/admin';
import {Career} from '../models/career';


@Component({
  selector: 'app-career-list',
  templateUrl: '../templates/career.list.template.html',
})

export class CareerListComponent implements OnInit {
  public careers: Career[];

  constructor(private route: ActivatedRoute, private careerService: CareerService,
    private adminService: AdminService) {

  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => params.get('id'))
      .subscribe(id => {
        this.adminService.getById(parseInt(id, 10)).then(admin => {
          this.careerService.getForAdmin(admin.careers).then(careers => this.careers = careers);
        });
      });
  }
}
