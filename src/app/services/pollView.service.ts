import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import {PollResult, Poll, NotYet, defaultOptions, DefaultOption} from '../models/poll'
import {tpi2017s2} from '../models/mocks/poll.mock'

@Injectable()
export class PollViewService{
    public pollResult: PollResult
    public poll: Poll
    public defaultOption : DefaultOption

    activePoll() {
      return of(tpi2017s2)
    }

    getActivePollResult(student){
      if(this.pollResult && this.pollResult.student === student){
        return of(this.pollResult)
      }
      this.pollResult = tpi2017s2.newPollResult(student, this.defaultOption)
      return of(this.pollResult)
    }

}
