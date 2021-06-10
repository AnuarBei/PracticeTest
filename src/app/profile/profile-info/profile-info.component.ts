import { Component, OnInit } from '@angular/core';
import {Statistics, User} from '../profile.module';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  statistics: Statistics;
  editingMode = false;
  user: User;
  age: number;
  statuses = ['pendingModeration', 'approved', 'rejected'];
  showDialog = false;

  constructor(public appService: AppService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.appService.user;
    if (this.user?.birth_date) {
      this.age = new Date().getFullYear() - new Date(this.user.birth_date).getFullYear();
    }
    this.profileService.getStatistics().subscribe((data: Statistics) => {
      this.statistics = data;
    });
  }

  getResult(event) {
    this.showDialog = false;
  }

  finishEditing() {
    this.editingMode = false;
    this.showDialog = true;
  }

  navigate(route) {
    this.router.navigate([route]);
  }
}
