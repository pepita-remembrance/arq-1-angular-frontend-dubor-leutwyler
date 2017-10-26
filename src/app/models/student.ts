import {Career} from './career';

export default class Student {
  constructor(public id: number, public name: string, public surname: string, public careers: Career[] = []) {
  }
}
