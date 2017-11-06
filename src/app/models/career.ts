import {SubjectOffer, Poll, OfferOption} from './poll';
import {Schedule} from './schedule';

export class Career {
  public polls: Poll[] = [];

  constructor(public id: string, public shortName: string, public longName: string, public subjects: Subject[] = []) {
  }

  public openPoll(): Poll {
    return this.polls.find(poll => poll.isOpen());
  }

  public getSubject(key: string): Subject {
    return this.subjects.find(sub => sub.shortName === key || sub.fullName === key);
  }

  public filterSubjects(keys: string[]): Subject[]{
    let res = []
    this.subjects.forEach(sub => {
      if(keys.indexOf(sub.shortName) > -1 || keys.indexOf(sub.fullName) > -1){
              res.push(sub)
      }
    })
    return res;
  }

  public newPoll(pollKey: string, notOfferedSubjects: Subject[]): Poll {
    const lastPoll = this.openPoll()
    if(lastPoll){
        lastPoll.close()
    }
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
  constructor(public shortName: string, public fullName: string, public area: string = "Programacion") {
  }
}

export class Course implements OfferOption {
  public schedules: Schedule[] = [];
  public text: string
  public isSelected = false;

  constructor(public id: string, schedule: Schedule, ...schedules: Schedule[]) {
    this.schedules.push(schedule);
    this.schedules.concat(schedules);
    this.text = this.textValue()
  }

  public isCourse(): boolean {
    return true;
  }

  public textValue(): string {
    return this.id + " " + this.schedules.map(schedule => schedule.textValue()).join(', ');
  }
}
