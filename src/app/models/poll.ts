import {Career, Subject} from './career';
import Student from './student';

export type CareerOffer = Map<Subject, SubjectOffer>;

export class PartialPoll {
  constructor(public key: string, public isOpen: boolean, public career: Career) {
  }
}

export class Poll {
  private open = false;
  public from: Date;
  public to: Date;
  public arrayOffer: [Subject, SubjectOffer][];
  public studentsFinished = 0;

  constructor(public key: string, public career: Career, public offer: CareerOffer, from: Date = new Date(),
  to: Date = new Date()) {
    this.arrayOffer = Array.from(offer);
    this.to = to;
    this.from = from;
  }

  public close() {
    this.open = false;
  }

  public openPoll() {
    this.open = true;
  }

  public isOpen() {
    const today = Date.now();
    return this.from.getTime() < today && this.to.getTime() > today;
  }

  public on(subjectKey: string): SubjectOffer {
    return this.offer.get(this.career.getSubject(subjectKey));
  }

  public newPollResult(student: Student, defaultOption: DefaultOption): PollResult {
    if (this.isOpen()) {
      return new PollResult(this, student, defaultOption);
    } else {
      throw new Error('Unable to create new PollResult on closed Poll');
    }
  }
}

export class NonCourseOption implements OfferOption {
  public isSelected = false;
  public key;

  constructor(public id: string, public text: string) {
    this.key = id
  }

  isCourse(): boolean {
    return false;
  }

  textValue(): string {
    return this.text;
  }

  addStudent(): void {}

  removeStudent(): void {}

}

export class DefaultOption extends NonCourseOption {
  constructor(text: string) {
    super(text, text);
  }
}

export class NotYet extends DefaultOption {
  constructor() {
    super('No voy a cursar');
  }
}

export class Yes extends DefaultOption {
  constructor() {
    super('Voy a cursar');
  }
}

export class AlreadyPassed extends DefaultOption {
  constructor() {
    super('Ya aprobe');
  }
}
export class NoSuitableSchedule extends DefaultOption {
  constructor() {
    super('Ningun horario me sirve');
  }
}

export class SubjectOffer {
  public options: OfferOption[] = [];

  constructor(courseOptions: OfferOption[]) {
    // this.options.concat(courseOptions);
  }

  public static defaultOffer() {
    return [
      {key: 'No voy a cursar', isCourse: false},
      {key: 'Ya aprobe', isCourse: false},
      {key: 'Ningun horario me sirve', isCourse: false},
    ];
  }

  public add(...courseOptions: OfferOption[]): SubjectOffer {
    this.options = this.options.concat(courseOptions);
    return this;
  }
}

export interface OfferOption {
  id: string;

  key: string;

  text: string;

  isCourse(): boolean;

  addStudent(): void;

  removeStudent(): void;

  textValue(): string;
}



export class PollResult {
  public results: Map<string, OfferOption>;
  public arrayResults: [string, OfferOption][] = [];

  constructor(public poll: Poll, public student: Student,
              public defaultOption: DefaultOption = new NotYet, public fillDate: Date = new Date(Date.now())) {
    this.results = new Map<string, OfferOption>();
    for(var subject in poll.offer){
      this.results.set(subject, defaultOption);
      this.arrayResults.push([subject, defaultOption]);
    }
  }

  asPartial(): PollResultPartial {
    return new PollResultPartial(this.poll.career.longName, this.poll.career.shortName, this.poll.key, this.fillDate);
  }

  submit() {
    this.student.pollResults.push(this);
  }

  setDefault(subjects: string[], defaultOption: DefaultOption) {
    this.arrayResults.forEach(res => {
      if (subjects.indexOf(res[0]) > -1) {
        res[1] = defaultOption;
      }
    });
  }
}

export class PollResultPartial {
  constructor(public careerLongName: string, public careerShortName: string, public pollKey: string, public pollFillDate: Date) {
  }
}

// export class Answer {
//   constructor(public subject: Subject, public offerOption : OfferOption){}
// }
