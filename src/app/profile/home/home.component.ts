import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import { Notification } from './home.model';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notifications: Notification[] = [];
  activeNotificationId = null;
  mainPageInfo: { id: number, body: string };

  constructor(private profileService: ProfileService,
              public appService: AppService) { }

  ngOnInit(): void {
    this.getMainPageInfo();
    this.getMyNotifications();
  }

  getMyNotifications() {
    this.profileService.getMyNotifications().subscribe((data: any) => {
      this.notifications = data.results;
    });
  }

  setActiveNotificationId(id) {
    if (this.activeNotificationId === id) {
      this.activeNotificationId = null;
      return;
    }
    this.activeNotificationId = id;
    this.profileService.removeUserFromNotification(id);
  }

  getMainPageInfo() {
    this.profileService.getMainPageInfo().subscribe((data: { id: number, body: string }) => {
      this.mainPageInfo = data;
    });
  }
}
