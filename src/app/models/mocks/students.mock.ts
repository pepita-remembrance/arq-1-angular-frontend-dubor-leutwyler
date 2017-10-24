import Student from '../student';
import * as C from './courses.mock';
import * as Types from '../course';

const students: Student[] = [new Student(0, 'Marco', 'Gomez'), new Student(1, 'Joaquin', 'Sanchez')];
students.forEach(student =>
  C.CAREERS.forEach(career => {
      student.careers.push(career);
      student.subjects = C.SUBJECTS;
    }
  )
);
export const STUDENTS: Student[] = students;
