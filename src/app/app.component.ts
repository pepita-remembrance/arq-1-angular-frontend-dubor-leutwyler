import { Component } from '@angular/core';
import {CareersService} from './services/careers.service';
import { OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

import { Career } from './models/course'

@Component({
  selector: 'app-root',
  providers: [CareersService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  careers : Career[];

  ngOnInit(): void {
    this.getCarrers();
  }

  constructor(private carrersService: CareersService) {}

  getCarrers() : void{
    this.carrersService.getCarrers().then(careers => this.careers = careers);
  }
}
