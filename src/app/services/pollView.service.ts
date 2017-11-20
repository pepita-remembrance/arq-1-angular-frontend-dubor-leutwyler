import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import {PollResult, Poll, NotYet, defaultOptions, DefaultOption, OfferOption} from '../models/poll';
import {Subject} from '../models/career';
import {tpi2017s2, tpiPolls} from '../models/mocks/poll.mock';
import Student from '../models/student';

@Injectable()
export class PollViewService {
    public pollResult: PollResult;
    public student: Student;
    public poll: Poll;
    public defaultOption: DefaultOption;
    public submitResults: Map<Subject, OfferOption> = new Map();
    public originalResults: Map<Subject, OfferOption>;

    allPolls() {
      return Promise.resolve(tpiPolls);
    }

    getPoll(key) {
      return Promise.resolve(tpiPolls.find(poll => poll.key === key));
    }

    getPollResult(key) {
      if (this.pollResult &&
          this.pollResult.student === this.student &&
          this.pollResult.poll.key === key) {
        return Promise.resolve(this.pollResult);
      }
      const pollResult = this.student.pollResults.find(pollR => pollR.poll.key === key);
      if (pollResult) {
        this.pollResult = pollResult;
        return Promise.resolve(pollResult);
      }
      this.pollResult = tpi2017s2.newPollResult(this.student, this.defaultOption);
      this.originalResults = new Map(this.pollResult.results);
      return Promise.resolve(this.pollResult);
    }

    submit() {
      if (this.student.pollResults.length > 0 &&
        this.student.pollResults[this.student.pollResults.length - 1].poll.key === this.pollResult.poll.key) {
        Array.from(this.student.pollResults[this.student.pollResults.length - 1].results).forEach(pair => {
          if (pair[1].isCourse()) {
            pair[1].removeStudent();
          }
        });
        this.student.pollResults.pop();
      }
      this.student.pollResults.push(this.pollResult);
      Array.from(this.pollResult.results).forEach(pair => {
        if (pair[1].isCourse()) {
          pair[1].addStudent();
        }
      });
      return Promise.resolve(this.student);
    }

}
