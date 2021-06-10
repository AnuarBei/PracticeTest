import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { AppService } from '../app.service';
import { User } from './profile.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  isInformationOrReferencePage = false;
  isCoursePage = false;
  routeChangeSub: Subscription;

  constructor(public router: Router,
              public profileService: ProfileService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.isCoursePage = this.router.url.includes('/profile/courses/');
    this.isInformationOrReferencePage = this.router.url === '/profile/reference' || this.router.url === '/profile/information';
    this.routeChangeSub = this.router.events.subscribe(val => {
      this.isCoursePage = this.router.url.includes('/profile/courses/');
      this.isInformationOrReferencePage = this.router.url === '/profile/reference' || this.router.url === '/profile/information';
    });

    this.appService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.profileService.getUser(this.appService.vicAuthData.user.id);
      }
    });
  }

  ngOnDestroy() {
    this.routeChangeSub.unsubscribe();
  }
}
