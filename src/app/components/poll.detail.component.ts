import { Component, Input, OnInit, OnChanges, ApplicationRef } from '@angular/core';


import {PollViewService} from '../services/pollView.service';

import {Poll, PollResult, SubjectOffer, OfferOption} from '../models/poll';
import {Subject} from '../models/career';

@Component({
  selector:   'app-poll-detail',
  templateUrl: '../templates/poll.detail.template.html',
})


export class PollDetailComponent implements OnInit {
  public arrayOffer: [Subject, SubjectOffer][];
  public arrayOfferConst: [Subject, SubjectOffer][];
  public pollResult: PollResult;
  public poll: Poll;

  constructor(public pollViewService: PollViewService, private ref: ApplicationRef) {
  }

  ngOnInit() {
    this.pollViewService.activePoll().subscribe(poll => {
      this.poll = poll;
    });
  }

  select(subject, option) {
    if (option.text !== this.pollViewService.originalResults.get(subject).text) {
      this.pollViewService.submitResults.set(subject, option);
    } else {
      this.pollViewService.submitResults.delete(subject);
    }
    this.pollViewService.pollResult.results.set(subject, option);
    this.ref.tick();
  }

  isSelected(subject, option) {
    return this.pollViewService.pollResult && this.pollViewService.pollResult.results.get(subject) &&
    this.pollViewService.pollResult.results.get(subject).text === option.text;
  }
}
