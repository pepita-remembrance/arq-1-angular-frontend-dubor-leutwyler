import Student from './student';
import * as C from './courses.mock'
import * as Types from './course'

let students : Student[] = [new Student(0, 'Marco', 'Gomez'), new Student(1, 'Joaquin', 'Sanchez')]
students.forEach(student =>
  C.CARRERS.forEach(career =>
    student.careers.push(career)
  )
)
export const STUDENTS: Student[] = students
