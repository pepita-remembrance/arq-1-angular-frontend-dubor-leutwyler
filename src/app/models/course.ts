import {Schedule} from './schedule';

export class Career {
  constructor(public id: string, public name: string, public link: string, public description: string,
              public subjects: Subject[] = []) {
  }
}

export class Subject {
  constructor(public name: string, public offer: Offer) {
  }
}

export class Offer {
  constructor(public courses: Course[]) {
  }
}

export class Course {
  constructor(public schedule: Schedule[]) {
  }
}
