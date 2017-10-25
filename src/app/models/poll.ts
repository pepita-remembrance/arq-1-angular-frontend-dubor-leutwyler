import {Career, Subject} from './career';

export type CareerOffer = Map<Subject, SubjectOffer>;

export class Poll {
  private open = true;

  constructor(public key: string, public career: Career, public offer: CareerOffer) {
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
}

export class SubjectOffer {
  public static defaultOptions = [];
  public options: OfferOption[] = [];

  constructor(courseOptions: OfferOption[]) {
    this.options.concat(courseOptions).concat(SubjectOffer.defaultOptions);
  }

  public static defaultOffer() {
    return new SubjectOffer([]);
  }

  public add(...courseOptions: OfferOption[]): SubjectOffer {
    this.options.concat(courseOptions);
    return this;
  }
}

export interface OfferOption {
  isCourse(): boolean;

  textValue(): string;
}

export class NonCourseOption implements OfferOption {

  constructor(private text: string) {
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
    SubjectOffer.defaultOptions.push(this);
  }
}

export const NotYet = new DefaultOption('Aun no voy a cursar');
export const AlreadyPassed = new DefaultOption('Ya aprobe');
export const NoSuitableSchedule = new DefaultOption('Ningun horario me sirve');
