import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AlertingComponent} from './alerting.component';


import {CareerService} from '../services/careers.service';
import {AdminService} from '../services/admin.service';
import {PollViewService} from '../services/pollView.service';

import Admin from '../models/admin';
import {Career} from '../models/career';
import {Poll} from '../models/poll';

@Component({
  selector: 'app-career-list',
  templateUrl: '../templates/career.list.template.html',
})

export class CareerListComponent extends AlertingComponent implements OnInit {
  public careers: Career[] = [];
  public newPollKey = '';
  public dateFrom: Date;
  public dateTo: Date;
  public selectedCareer: Career;

  constructor(private route: ActivatedRoute, private careerService: CareerService,
    private adminService: AdminService,
    public pollViewService: PollViewService,
    flashMessagesService: FlashMessagesService) {
      super(flashMessagesService);
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => params.get('id'))
      .subscribe(id => {
        this.adminService.getById(parseInt(id, 10)).then(admin => {
          this.careerService.getForAdmin(admin.careers).then(careers => this.careers = careers);
        });
      });
  }

  onSubmit() {
    const newPoll = this.selectedCareer.newPoll(this.newPollKey, [], this.dateFrom, this.dateTo);
    this.pollViewService.createPoll(newPoll).then(poll => this.success(`La encuesta fue creada con exito`));
  }
}
