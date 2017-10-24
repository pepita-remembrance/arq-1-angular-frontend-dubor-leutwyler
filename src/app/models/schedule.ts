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

class Day {

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

export const Monday = new Day(0, 'Monday');
export const Tuesday = new Day(1, 'Tuesday');
export const Wednesday = new Day(2, 'Wednesday');
export const Thursday = new Day(3, 'Thursday');
export const Friday = new Day(4, 'Friday');
export const Saturday = new Day(5, 'Saturday');
export const Sunday = new Day(6, 'Sunday');
