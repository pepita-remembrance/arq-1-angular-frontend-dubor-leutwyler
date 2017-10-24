import * as MyTypes from './course';

const eighteenToTwentyTwo = MyTypes.Interval.from('18', '00').to('21', '59');
const nineToOne = MyTypes.Interval.from('09', '00').to('12', '59');
const sixToTen = MyTypes.Interval.from('06', '00').to('09', '59');
const tuesdayToThursday = new MyTypes.Course(
  [
    new MyTypes.Schedule(new MyTypes.Tuesday(), eighteenToTwentyTwo),
    new MyTypes.Schedule(new MyTypes.Wednesday(), eighteenToTwentyTwo),
    new MyTypes.Schedule(new MyTypes.Thursday(), eighteenToTwentyTwo)
  ]);

const onlyMonday = new MyTypes.Course(
  [
    new MyTypes.Schedule(new MyTypes.Monday(), nineToOne),
  ]);

const onlySaturday = new MyTypes.Course(
  [
    new MyTypes.Schedule(new MyTypes.Monday(), sixToTen),
  ]);
const offer = new MyTypes.Offer([tuesdayToThursday]);
const offer2 = new MyTypes.Offer([onlyMonday, onlySaturday]);
const intro = new MyTypes.Subject('Introduccion a la programacion', offer);
const lyp = new MyTypes.Subject('Logica y Programacion', offer2);
const tpi = new MyTypes.Career('1', 'TPI', 'Tecnicatura', 'Mucha programacion', [intro]);
export const CAREERS: MyTypes.Career[] = [
  tpi,
];

export const SUBJECTS: MyTypes.Subject[] = [
  intro,
  lyp,
];
