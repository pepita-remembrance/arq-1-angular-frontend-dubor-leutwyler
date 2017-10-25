import {SubjectOffer, Poll, OfferOption} from './poll';
import {Schedule} from './schedule';

export class Career {
  public polls: Poll[] = [];

  constructor(public id: string, public shortName: string, public description: string, public subjects: Subject[] = []) {
  }

  public openPoll(): Poll {
    return this.polls.find(poll => poll.isOpen());
  }

  public getSubject(key: string): Subject {
    return this.subjects.find(sub => sub.shortName === key || sub.fullName === key);
  }

  public newPoll(pollKey: string, notOfferedSubjects: Subject[]): Poll {
    this.openPoll().close();
    const offer = new Map<Subject, SubjectOffer>();
    this.subjects
      .filter(subject => !notOfferedSubjects.includes(subject))
      .map(subject => offer.set(subject, SubjectOffer.defaultOffer()));
    const poll = new Poll(pollKey, this, offer);
    this.polls.push(poll);
    return poll;
  }
}

export class Subject {
  constructor(public shortName: string, public fullName: string) {
  }
}

export class Course implements OfferOption {
  public schedules: Schedule[];

  constructor(public id: string, ...schedules: Schedule[]) {
    this.schedules = schedules;
  }

  public isCourse(): boolean {
    return true;
  }

  public textValue(): string {
    return this.id + this.schedules.map(schedule => schedule.textValue()).join(', ');
  }
}
