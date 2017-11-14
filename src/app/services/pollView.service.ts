import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import {PollResult, Poll, NotYet, defaultOptions, DefaultOption, OfferOption} from '../models/poll';
import {Subject} from '../models/career';
import {tpi2017s2} from '../models/mocks/poll.mock';

@Injectable()
export class PollViewService {
    public pollResult: PollResult;
    public poll: Poll;
    public defaultOption: DefaultOption;
    public submitResults: Map<Subject, OfferOption> = new Map();
    public originalResults: Map<Subject, OfferOption>;

    activePoll() {
      return of(tpi2017s2);
    }

    getActivePollResult(student) {
      if (this.pollResult && this.pollResult.student === student) {
        return of(this.pollResult);
      }
      this.pollResult = tpi2017s2.newPollResult(student, this.defaultOption);
      this.originalResults = new Map(this.pollResult.results);
      return of(this.pollResult);
    }

}
