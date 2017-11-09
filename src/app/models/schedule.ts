export class Schedule {
  constructor(public day: Day, public interval: Interval) {
  }

  textValue(): string {
    return this.day.textValue() + ' ' + this.interval.textValue();
  }
}

export class Interval {
  constructor(public hour: number, public minutes: number, public hourTo: number, public minutesTo: number) {
  }

  public textValue(): string {
    return this.hour + ':' + (this.minutes < 10 ? '0' : '') + this.minutes +
      ' a ' + this.hourTo + ':' + (this.minutesTo < 10 ? '0' : '') + this.minutesTo;
  }
}

export class Day {

  constructor(private value: number, private name: string) {
  }

  public textValue(): string {
    return this.name;
  }

  publicgetName(): string {
    return this.name;
  }

  public getValue(): number {
    return this.value;
  }

  public from(hour: number, minutes: number = 0): ScheduleBuilder {
    return new ScheduleBuilder(this, hour, minutes);
  }

}

class ScheduleBuilder {
  constructor(public day: Day, public hour: number, public minutes: number) {
  }

  public to(toHour: number, toMinutes: number = -1): Schedule {
    let interval: Interval;
    if (toMinutes === -1) {
      interval = new Interval(this.hour, this.minutes, toHour - 1, 59);
    } else {
      interval = new Interval(this.hour, this.minutes, toHour, toMinutes);
    }
    return new Schedule(this.day, interval);
  }

}

export const Monday = new Day(0, 'Lunes');
export const Tuesday = new Day(1, 'Martes');
export const Wednesday = new Day(2, 'Miercoles');
export const Thursday = new Day(3, 'Jueves');
export const Friday = new Day(4, 'Viernes');
export const Saturday = new Day(5, 'Sabado');
export const Sunday = new Day(6, 'Domingo');
