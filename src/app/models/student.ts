import {Career} from './career';

export default class Student {
  constructor(public fileNumber: number, public name: string, public surname: string, public careers: Career[] = []) {
  }
}
