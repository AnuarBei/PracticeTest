import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Education, Workplace} from '../profile/profile.module';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  getData = new Subject<any>();
  base = 'https://srh.org.kz/api/';

  constructor(private http: HttpClient) { }

  createUser(data) {
    const user = new FormData();
    for (const key in data) {
      if (data[key]) {
        user.append(key, data[key]);
      }
    }
    return this.http.post(this.base + 'users/user/', user);
  }
// function instead of if elses
  updateUser(data) {
    if (typeof data.doc1 === 'string') {
      delete data.doc1;
    }
    if (typeof data.doc2 === 'string') {
      delete data.doc2;
    }
    const user = new FormData();
    for (const key in data) {
      if (data[key]) {
        user.append(key, data[key]);
      }
    }
    return this.http.patch(this.base + `users/user/${data.id}`, user);
  }

  createWorkplace(data: Workplace) {
    const workplace = new FormData();
    for (const key in data) {
      if (data[key]) {
        workplace.append(key, data[key]);
      }
    }
    this.http.post(this.base + 'users/workplace/', workplace).subscribe();
  }

  updateWorkplace(data: Workplace) {
    if (typeof data.doc === 'string') {
      delete data.doc;
    }
    const workplace = new FormData();
    for (const key in data) {
      if (data[key]) {
        workplace.append(key, data[key]);
      }
    }
    this.http.patch(this.base + `users/workplace/${data.id}`, workplace).subscribe();
  }

  createEducation(data: Education) {
    const education = new FormData();
    for (const key in data) {
      if (data[key]) {
        education.append(key, data[key]);
      }
    }
    this.http.post(this.base + 'users/education/', education).subscribe();
  }

  updateEducation(data: Education) {
    if (typeof data.doc === 'string') {
      delete data.doc;
    }
    const education = new FormData();
    for (const key in data) {
      if (data[key]) {
        education.append(key, data[key]);
      }
    }
    this.http.patch(this.base + `users/education/${data.id}`, education).subscribe();
  }

  getJobSpecialities() {
    return this.http.get(this.base + `users/job-specialities/?limit=999&offset=0`);
  }

  getSpecialities() {
    return this.http.get(this.base + `users/specialities/?limit=999&offset=0`);
  }

  getCities() {
    return this.http.get(this.base + `users/cities/?limit=999&offset=0`);
  }
}
