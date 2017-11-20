import {Career, Subject} from './career';
import Student from './student';

export type CareerOffer = Map<Subject, SubjectOffer>;

export class Poll {
  private open = true;
  public arrayOffer: [Subject, SubjectOffer][];

  constructor(public key: string, public career: Career, public offer: CareerOffer) {
    this.arrayOffer = Array.from(offer);
  }

  public close() {
    this.open = false;
  }

  public isOpen() {
    return this.open;
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

  constructor(public text: string) {
  }

  isCourse(): boolean {
    return false;
  }

  textValue(): string {
    return this.text;
  }

}

export class DefaultOption extends NonCourseOption {
  constructor(text: string) {
    super(text);
  }
}

export class NotYet extends DefaultOption {
  constructor() {
    super('Aun no voy a cursar');
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
    super('El horario no me sirve');
  }
}

export const defaultOptions = [new NotYet, new NoSuitableSchedule, new AlreadyPassed];
export class SubjectOffer {
  public options: OfferOption[] = [];

  constructor(courseOptions: OfferOption[]) {
    this.options.concat(courseOptions).concat(defaultOptions);
  }

  public static defaultOffer() {
    return new SubjectOffer([]);
  }

  public add(...courseOptions: OfferOption[]): SubjectOffer {
    this.options = this.options.concat(courseOptions);
    return this;
  }
}

export interface OfferOption {
  text: string;

  isCourse(): boolean;

  textValue(): string;
}



export class PollResult {
  public results: Map<Subject, OfferOption>;
  public arrayResults: [Subject, OfferOption][] = [];

  constructor(public poll: Poll, public student: Student,
              public defaultOption: DefaultOption = new NotYet, public fillDate: Date = new Date(Date.now())) {
    this.results = new Map<Subject, OfferOption>();
    Array.from(poll.offer.keys()).forEach(subject => {
      this.results.set(subject, defaultOption);
      this.arrayResults.push([subject, defaultOption]);
    });

  }

  asPartial(): PollResultPartial {
    return new PollResultPartial(this.poll.career.longName, this.poll.career.shortName, this.poll.key, this.fillDate);
  }

  submit() {
    this.student.pollResults.push(this);
  }

  setDefault(subjects: Subject[], defaultOption: DefaultOption) {
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
