import { Component, OnInit } from '@angular/core';
import {NewsItem} from '../news/news.module';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../profile/profile.module';
import {ProfileService} from '../profile/profile.service';
import {AppService} from '../app.service';
import {MyCourse} from './training.module';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  course: Course;
  selectedCourse: MyCourse;
  dates: { value: MyCourse, option: string }[] = [];
  months: { value: string, active: boolean }[] = [];
  year = new Date().getFullYear();
  month: string = null;
  showDialog = false;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              public appService: AppService,
              public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.profileService.getCourse(id).subscribe((data: Course) => {
        this.course = data;
        this.getMonths();
      });
    });
  }

  getMonths() {
    this.month = null;
    this.months = [];
    this.dates = [];
    const months = new Set();
    this.course.durations.forEach((duration: { start: string, end: string }) => {
      const month = this.appService.moment(duration.start).format('MMMM');
      const year = +this.appService.moment(duration.start).format('YYYY');
      if (year === this.year) {
        months.add(month);
      }
    });
    months.forEach((month: string) => {
      this.months.push({
        value: month,
        active: false
      });
    });
    if (this.months.length) {
        this.month = this.months[0].value;
        this.months[0].active = true;
        this.getDates(this.month);
    }
  }

  getDates(selectedMonth) {
    this.month = selectedMonth;
    this.dates = [];
    this.course.durations.forEach((duration: { start: string, end: string, id: number }) => {
      const month = this.appService.moment(duration.start).format('MMMM');
      const year = +this.appService.moment(duration.start).format('YYYY');
      if (selectedMonth === month && this.year === year) {
        this.dates.push({
          value: {
            ...duration,
            duration: duration.id,
            course: this.course.id
          },
          option: `${duration.start} - ${duration.end}`
        });
      }
    });
  }

  createMyCourse() {
    if (this.selectedCourse) {
      this.profileService.createMyCourse(this.selectedCourse).subscribe(() => {
        this.router.navigate(['/profile/courses']);
      }, error => {
        if (this.appService.isLoggedIn.getValue()) {
          this.router.navigate(['/profile/courses']);
        } else {
          this.router.navigate(['/registration']);
        }
      });
    } else {
      this.showDialog = true;
    }
  }

  getResult(answer) {
    this.showDialog = false;
  }
}
