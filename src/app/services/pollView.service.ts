import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import {PollResult, Poll, PartialPoll, NotYet, DefaultOption, OfferOption} from '../models/poll';
import {Subject} from '../models/career';
import {tpi2017s2, tpiPolls} from '../models/mocks/poll.mock';
import Student from '../models/student';
import {Career} from '../models/career';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'


@Injectable()
export class PollViewService {
    public pollResult: PollResult;
    public student: Student;
    public poll: Poll;
    public polls: PartialPoll[]
    public defaultOption: DefaultOption;
    public submitResults: Map<string, OfferOption> = new Map();
    public originalResults: Map<string, OfferOption>;
    public careers: Career[]

    studentsUrl = `https://ins-poll-back${environment.URL_SUFFIX}.herokuapp.com/students`;
    careersUrl = `https://ins-poll-back${environment.URL_SUFFIX}.herokuapp.com/admins/careers`;

    constructor(
      private http: HttpClient
    ) {
    }

    allPolls() {
      return Promise.resolve(tpiPolls);
    }

    getPoll(careerKey, key) {
      return this.http.get<Poll>
      (`${this.careersUrl}/${careerKey}/polls/${key}`).toPromise()
    }

    createPoll(poll: Poll) {
      tpiPolls.unshift(poll);
      return Promise.resolve(poll);
    }

    getPollResult(careerKey, key) {
      if (this.pollResult &&
          this.pollResult.student === this.student &&
          this.pollResult.poll.key === key) {
        return Promise.resolve(this.pollResult);
      }
      return this.http.get<PollResult>
      (`${this.studentsUrl}/${this.student.fileNumber}/careers/${careerKey}/polls/${key}`).toPromise().then(
        pollResult => {
          this.originalResults = pollResult.results
          this.pollResult = pollResult
          return pollResult
        }
      )
    }

    submit(careerKey, key) {
      return this.http.patch<PollResult>
      (`${this.studentsUrl}/${this.student.fileNumber}/careers/${careerKey}/polls/${key}`, this.submitResults)
      .toPromise()
    }

}
