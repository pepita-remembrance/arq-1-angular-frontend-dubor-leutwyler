import {Component, Input} from '@angular/core';

import {Poll, PollResult} from '../models/poll';

@Component({
  selector: 'app-poll-detail',
  templateUrl: '../templates/poll.detail.template.html',
})


export class PollDetailComponent {
  @Input('pollResult') pollResult: PollResult;
  @Input('poll') poll: Poll;

  select(subject, option) {
    this.pollResult.results.set(subject, option);
  }

  isSelected(subject, option) {
    return this.pollResult.results.get(subject) && this.pollResult.results.get(subject).text === option.text;
  }
}
