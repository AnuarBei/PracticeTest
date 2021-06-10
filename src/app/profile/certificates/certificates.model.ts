import {Course} from '../profile.module';

export interface Certificate {
  certificate: string;
  course: Course;
  id: number;
  user: number;
  date_created: string;
}
