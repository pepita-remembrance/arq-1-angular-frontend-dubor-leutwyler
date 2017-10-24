import {Interval, Schedule, Monday, Thursday, Tuesday, Wednesday} from '../schedule';
import {Career, Course, Offer, Subject} from '../course';

const eighteenToTwentyTwo = Interval.from('18', '00').to('21', '59');
const nineToOne = Interval.from('09', '00').to('12', '59');
const sixToTen = Interval.from('06', '00').to('09', '59');
const tuesdayToThursday = new Course(
  [
    new Schedule(Tuesday, eighteenToTwentyTwo),
    new Schedule(Wednesday, eighteenToTwentyTwo),
    new Schedule(Thursday, eighteenToTwentyTwo)
  ]);

const onlyMonday = new Course(
  [
    new Schedule(Monday, nineToOne),
  ]);

const onlySaturday = new Course(
  [
    new Schedule(Monday, sixToTen),
  ]);
const offer = new Offer([tuesdayToThursday]);
const offer2 = new Offer([onlyMonday, onlySaturday]);
const intro = new Subject('Introduccion a la programacion', offer);
const lyp = new Subject('Logica y Programacion', offer2);
const tpi = new Career('1', 'TPI', 'Tecnicatura', 'Mucha programacion', [intro]);
export const CAREERS: Career[] = [
  tpi,
];

export const SUBJECTS: Subject[] = [
  intro,
  lyp,
];
