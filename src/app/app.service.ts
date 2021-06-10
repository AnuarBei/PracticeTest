import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from './profile/profile.module';
import * as moment from 'moment';
import {AuthorizationService} from './authorization/authorization.service';
import {Router} from '@angular/router';
import {MyCourse} from './training/training.module';
import {HttpClient} from '@angular/common/http';
moment.locale('ru');

@Injectable({ providedIn: 'root' })
export class AppService {
  isOnImpairedMode = false;
  language = 'ru'; // kk, ru
  base = 'https://srh.org.kz/api/';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedIn = new Subject<boolean>();
  vicAuthData: { token: string, expires_in: string, user: User };
  user: User;
  myCourse: MyCourse;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private http: HttpClient) { }

  moment(data) {
    return moment(data);
  }

  getStatus(myCourse) {
    if (myCourse.tested && this.moment(myCourse.start) > this.moment(new Date())) {
      return 1;
    }
    if (myCourse.tested && this.moment(myCourse.start) < this.moment(new Date())) {
      return 2;
    }
    if (myCourse.moduls_count === myCourse.moduls_passed) {
      return 3;
    }
    return 0;
  }

  logOut() {
    localStorage.removeItem('vic-auth-data');
    this.isLoggedIn.next(false);
    this.user = undefined;
    this.router.navigate(['/']);
  }

  logIn(credentials) {
    return this.authorizationService.authenticate(credentials);
  }

  getAboutInfo() {
    return this.http.get(this.base + 'info/about/');
  }

  getContactsInfo() {
    return this.http.get(this.base + 'info/contacts/');
  }

  getReferenceInfo() {
    return this.http.get(this.base + 'info/reference/');
  }

  getForStudentsInfo() {
    return this.http.get(this.base + 'info/forstudents/');
  }

  getOurStudents() {
    return this.http.get(this.base + 'info/ourstudents/?limit=999&offset=0');
  }

  getSocialMediaInfo() {
    return this.http.get(this.base + 'info/socialmedia/?limit=999&offset=0');
  }

  getCallCenterInfo() {
    return this.http.get(this.base + 'info/callcenter/?limit=999&offset=0');
  }
}
