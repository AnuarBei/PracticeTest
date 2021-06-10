import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppService} from './app.service';

import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dimBackground = false;
  routeChangeSub: Subscription;
  isMain = false;

  constructor(public router: Router,
              public appService: AppService,
              public translate: TranslateService,
              public profileService: ProfileService) {
    translate.addLangs(['ru', 'kk']);
    translate.setDefaultLang(this.appService.language);
    translate.use('ru');
  }

  paths = [
    '/profile/courses/test-results',
    // '/'
  ];

  ngOnInit(): void {
    const vicAuthData = localStorage.getItem('vic-auth-data');
    if (vicAuthData) {
      this.appService.vicAuthData = JSON.parse(vicAuthData);
      if (this.appService.vicAuthData) {
        this.profileService.getUser(this.appService.vicAuthData.user.id);
      }
      this.appService.isLoggedIn.next(true);
    }

    this.dimBackground = this.paths.includes(this.router.url);
    this.routeChangeSub = this.router.events.subscribe(val => {
      this.dimBackground = this.paths.includes(this.router.url);
      this.isMain = this.router.url === '/';
    });
  }

  ngOnDestroy() {
    this.routeChangeSub.unsubscribe();
  }
}
