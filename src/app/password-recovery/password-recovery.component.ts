import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {AppService} from '../app.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  isSent = false;
  email = null;
  base = 'https://srh.org.kz/api/';

  constructor(private http: HttpClient,
              private location: Location,
              public appService: AppService) { }

  ngOnInit(): void {
  }

  reset() {
    if (this.email) {
      this.http.post(this.base + 'reset-password/', { email: this.email }).subscribe(response => {
        //console.log(response);
        this.isSent = true;
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
