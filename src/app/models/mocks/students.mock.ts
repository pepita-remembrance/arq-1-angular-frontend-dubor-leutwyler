import Student from '../student';
import {tpi} from './career.mock';

const students: Student[] = [
  new Student(0, 'Marco', 'Gomez'),
  new Student(1, 'Joaquin', 'Sanchez')
];
students.forEach(student => student.careers.push(tpi));

export const STUDENTS: Student[] = students;
