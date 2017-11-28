import Student from '../student';
import {tpi} from './career.mock';

const students: Student[] = [
  new Student(0, 'Marco', 'Gomez'),
  new Student(1, 'Joaquin', 'Sanchez')
];

class NameRandomizer {
  public static randomString(length) {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  public static createStudents(arr) {
    for (let i = 2; i < 599; i += 1) {
      arr.push(new Student(i, NameRandomizer.randomString(20), NameRandomizer.randomString(20)));
    }
  }
}

students.forEach(student => student.careers.push(tpi));

export const STUDENTS: Student[] = students;
