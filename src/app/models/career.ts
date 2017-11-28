import {SubjectOffer, Poll, OfferOption} from './poll';
import {Schedule} from './schedule';

export class Career {

  constructor(public id: string, public shortName: string, public longName: string, public subjects: Subject[] = [],
  public polls: Poll[] = []) {
  }

  public getStudents() {
    return 600;
  }

  public openPoll(): Poll {
    return this.polls.find(poll => poll.isOpen());
  }

  public activePolls(): Poll[] {
    return this.polls.filter(poll => poll.isOpen());
  }

  public getSubject(key: string): Subject {
    return this.subjects.find(sub => sub.shortName === key || sub.fullName === key);
  }

  public filterSubjects(keys: string[]): Subject[] {
    const res = [];
    this.subjects.forEach(sub => {
      if (keys.indexOf(sub.shortName) > -1 || keys.indexOf(sub.fullName) > -1) {
              res.push(sub);
      }
    });
    return res;
  }

  public newPoll(pollKey: string, notOfferedSubjects: Subject[], from = new Date, to = new Date): Poll {
    const offer = new Map<Subject, SubjectOffer>();
    this.subjects
      .filter(subject => !notOfferedSubjects.includes(subject))
      .map(subject => offer.set(subject, new SubjectOffer(SubjectOffer.defaultOffer())));
    const poll = new Poll(pollKey, this, offer, from, to);
    this.polls.unshift(poll);
    return poll;
  }
}

export class Subject {
  constructor(public shortName: string, public fullName: string, public area: string = 'Programacion') {
  }
}

export class Course implements OfferOption {
  public schedules: Schedule[] = [];
  public text: string;
  public isSelected = false;
  public maxSlots = 40;
  public currentStudents = 0;

  constructor(public id: string, schedule: Schedule, ...schedules: Schedule[]) {
    this.schedules.push(schedule);
    this.schedules.concat(schedules);
    this.text = this.textValue();
  }

  public isCourse(): boolean {
    return true;
  }

  public addStudent() {
    this.currentStudents = this.currentStudents + 1;
  }

  public removeStudent() {
    this.currentStudents = this.currentStudents - 1;
  }

  public percentageOccupied() {
    return this.currentStudents / this.maxSlots * 100;
  }

  public textValue(): string {
    return this.id + ' ' + this.schedules.map(schedule => schedule.textValue()).join(', ');
  }
}
