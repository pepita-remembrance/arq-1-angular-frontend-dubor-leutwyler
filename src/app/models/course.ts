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

export class Schedule {
  constructor(public day: Day, public interval: Interval) {
  }
}

export class Interval {
  constructor(public hour: string, public minutes: string, public hourTo: string, public minutesTo: string) {
  }

  public static from(hour: string, minutes: string): Interval {
    return new Interval(hour, minutes, '', '');
  }

  public to(hour: string, minutes: string): Interval {
    this.hourTo = hour;
    this.minutesTo = minutes;
    return this;
  }
}

export abstract class Day {

  constructor(private value: number, private name: string) {
  }

  getName(): string {
    return this.name;
  }

  getValue(): number {
    return this.value;
  }

  compare(d1, d2): boolean {
    return d1.getValue() < d2.getValue();
  }
}

export class Monday extends Day {
  constructor() {
    super(0, 'Monday');
  }
}

export class Tuesday extends Day {
  constructor() {
    super(1, 'Tuesday');
  }
}

export class Wednesday extends Day {
  constructor() {
    super(2, 'Wednesday');
  }
}

export class Thursday extends Day {
  constructor() {
    super(3, 'Thursday');
  }
}

export class Friday extends Day {
  constructor() {
    super(4, 'Friday');
  }
}

export class Saturday extends Day {
  constructor() {
    super(5, 'Saturday');
  }
}

export class Sunday extends Day {
  constructor() {
    super(6, 'Sunday');
  }
}
