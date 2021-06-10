import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppService} from '../app.service';
import {Course, Message, User} from './profile.module';
import {MyCourse} from '../training/training.module';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  base = 'https://srh.org.kz/api/';
  courses: Course[];

  constructor(private http: HttpClient,
              private appService: AppService,
              public translate: TranslateService) { }

  getUser(id) {
    return this.http.get(this.base + `users/user/${id}/`).subscribe((data: User) => {
      this.appService.user = data;
      this.appService.language = data.lang;
      this.translate.use(data.lang);
    });
  }

  updateUser(user) {
    return this.http.patch(this.base + `users/user/${user.id}/`, user);
  }

  getCourses(params = {}) {
    const lang = this.appService.user ? this.appService.user.lang : this.appService.language;
    return this.http.get(this.base + 'courses/courses/', { params: { ...params, lang } });
  }

  getCourse(id) {
    return this.http.get(this.base + `courses/courses/${id}`);
  }

  createMyCourse(data: MyCourse) {
    return this.http.post(this.base + 'courses/my/', data);
  }

  updateMyCourse(data) {
    this.http.patch(this.base + `courses/my/${data.id}`, data).subscribe();
  }

  getMyCourses() {
    return this.http.get(this.base + 'courses/my/');
  }

  getMyCourse(id) {
    return this.http.get(this.base + `courses/my/${id}/`);
  }

  getModule(id) {
    return this.http.get(this.base + `courses/moduls/${id}`);
  }

  getLibrary(params = {}) {
    return this.http.get(this.base + 'courses/library', { params });
  }

  getStatistics() {
    return this.http.get(this.base + 'users/stats?limit=999&offset=0');
  }

  getTest(id) {
    return this.http.get(this.base + `courses/tests/${id}/`);
  }

  createMyTest(data) {
    return this.http.post(this.base + 'courses/tests/my', data);
  }

  getMyTest(testId) {
    return this.http.get(this.base + `courses/tests/my/${testId}/`);
  }

  getMyTests(courseId) {
    return this.http.get(this.base + `courses/tests/my/${courseId}`);
  }

  incrementAttempt(test) {
    this.http.post(this.base + `courses/tests/attempts/${test}/`, {}).subscribe();
  }

  getMyMessages() {
    return this.http.get(this.base + `users/messages/my/?limit=9999&offset=0`);
  }

  createMessage(data: Message) {
    return this.http.post(this.base + `users/messages/`, data);
  }

  getMyNotifications() {
    return this.http.get(this.base + `users/notifications/my/?limit=9999&offset=0`);
  }

  // removes current user from the user list of the notification
  removeUserFromNotification(notificationId) {
    this.http.post(this.base + `users/notifications/${notificationId}/viewed/ `, {}).subscribe();
  }

  getMyCertificates() {
    return this.http.get(this.base + `courses/certificates/my/?limit=9999&offset=0`);
  }

  getMainPageInfo() {
    return this.http.get(this.base + `info/mainpage/?limit=9999&offset=0`);
  }
}
