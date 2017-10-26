import {Component} from '@angular/core';
import {CareerService} from '../services/careers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  providers: [CareerService],
  templateUrl: '../templates/landing.template.html',
})

export class LandingComponent {
  constructor(public careerService: CareerService, public router: Router) {
  }
}
