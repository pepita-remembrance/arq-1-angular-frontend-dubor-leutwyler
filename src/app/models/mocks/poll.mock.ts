import {Interval, Monday, Schedule, Thursday, Tuesday, Wednesday} from '../schedule';
import {tpi} from './career.mock';
import {Course} from '../career';

function from(hour: number, minutes: number = 0): IntervalBuilder {
  return new IntervalBuilder(hour, minutes);
}

class IntervalBuilder {
  constructor(public hour: number, public minutes: number) {
  }

  public to(toHour: number, toMinutes: number = -1): Interval {
    if (toMinutes === -1) {
      return new Interval(this.hour, this.minutes, toHour - 1, 59);
    } else {
      return new Interval(this.hour, this.minutes, toHour, toMinutes);
    }
  }

}


const skippedSubjects = ['BD2', 'ProyLib', 'InArq', 'InBio', 'Politicas', 'Geo', 'Decl', 'DADC'];

const tpi2017s2 = tpi.newPoll('2017s2', skippedSubjects.map(tpi.getSubject));

tpi2017s2.on('InPr').add(
  new Course('C1', new Schedule(Monday, from(10).to(13)))
);
