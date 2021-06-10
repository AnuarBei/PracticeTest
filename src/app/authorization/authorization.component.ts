import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {Credentials} from './authorization.module';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {User} from '../profile/profile.module';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  credentials: Credentials = {
    email: null,
    password: null
  };
  isInvalid = false;

  constructor(private authorizationService: AuthorizationService,
              public appService: AppService,
              private router: Router) { }

  ngOnInit(): void {
  }

  authenticate() {
    if (this.credentials.email && this.credentials.password) {
      this.isInvalid = false;
      this.appService.logIn(this.credentials)
        .subscribe(
          (data: { token: string, expires_in: string, user: User }) => {
            localStorage.setItem('vic-auth-data', JSON.stringify(data));
            this.appService.vicAuthData = data;
            this.appService.isLoggedIn.next(true);
            this.appService.loggedIn.next(true);
            this.router.navigate(['/profile']);
          },
          error => {
            this.isInvalid = true;
          }
        );
    } else {
      this.isInvalid = true;
    }
  }
}
