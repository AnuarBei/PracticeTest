export interface Education {
  id?: number;
  name_org: string;
  type: string;
  spec: string;
  doc: string;
  user: number;
}

export interface Workplace {
  id?: number;
  name_org: string;
  date_start: string;
  position: string;
  spec: string;
  doc: string;
  user: number;
}

export interface User {
  id: number;
  avatar: string;
  full_name: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: string;
  region: string;
  doc1: string;
  doc2: string;
  lang: string;
  created: string;
  status: number;
  educations: Education[];
  workplaces: Workplace[];
}

export interface Course {
  id: number;
  durations: { start: string, end: string }[];
  name: string;
  image: string;
  about: string;
  syllabus?: string;
  moduls?: Module[];
  description: string;
}

export interface Option {
  id: number;
  option: string;
  correct: boolean;
  question?: number;
}

export interface Question {
  id: number;
  options: Option[];
  value: string;
  test?: number;
}

export interface Test {
  id: number;
  questions: Question[];
  min: number;
  module?: number;
  course?: number;
  attempts: number;
  max: number;
  duration: number;
  type: number
}

export interface Chapter {
  id: number;
  name: string;
  video: string;
  module: number;
}

export interface Link {
  id: number;
  name: string;
  link: string;
  module: number;
}

export interface Module {
  id: number;
  chapters: Chapter[];
  links: Link[];
  test: Test[];
  name: string;
  course: number;
}

export interface Book {
  about: string;
  created: string;
  file: string;
  id: number;
  name: string;
}

export interface Statistics {
  completed: number;
  current: number;
  certificates: number;
}

export interface Answer {
  option: number;
}

export interface Message {
  id?: number;
  answer: boolean;
  body: string;
  date_created?: string;
}
