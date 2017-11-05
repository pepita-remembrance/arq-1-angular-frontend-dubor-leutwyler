import { Component, Input } from '@angular/core';

import {Poll, PollResult} from '../models/poll'

@Component({
  selector:   'poll-detail',
  templateUrl: '../templates/poll.detail.template.html',
})


export class PollDetailComponent {
  @Input("pollResult") pollResult: PollResult
  @Input("poll") poll: Poll
}
