import {Component} from '@angular/core';
import {StudentService} from '../services/students.service';
import {CareerService} from '../services/careers.service';

@Component({
  selector: 'app-poll-list',
  providers: [StudentService, CareerService],
  templateUrl: '../templates/poll.list.template.html',
})

export class PollListComponent {
}
