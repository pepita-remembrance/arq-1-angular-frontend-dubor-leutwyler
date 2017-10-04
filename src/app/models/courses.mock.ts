import * as MyTypes  from './course';

const eighteenToTwentyTwo = MyTypes.Interval.from("18","00").to("21", "59")
const tuesdayToThursday = new MyTypes.Course(
  [
    new MyTypes.Schedule(new MyTypes.Tuesday(), eighteenToTwentyTwo),
    new MyTypes.Schedule(new MyTypes.Wednesday(), eighteenToTwentyTwo),
    new MyTypes.Schedule(new MyTypes.Thursday(), eighteenToTwentyTwo)
  ])
const offer = new MyTypes.Offer([tuesdayToThursday])
const intro = new MyTypes.Subject("Introduccion a la programacion", offer)
const tpi = new MyTypes.Career("1", "TPI", "Tecnicatura", "Mucha programacion", [intro])
export const CARRERS: MyTypes.Career[] = [
  tpi,
]
