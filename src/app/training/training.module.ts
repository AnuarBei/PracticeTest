import { Course } from '../profile/profile.module';

export interface MyCourse {
  id?: number;
  tested?: boolean;
  moduls_count?: number;
  moduls_passed?: number;
  chapters_passed?: number;
  start: string;
  end: string;
  course: any; // Course | number
  duration: number;
  tested_final?: number;
}
