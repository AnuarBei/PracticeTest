import {Component, Input, OnInit} from '@angular/core';
import {MyCourse} from '../../../training/training.module';
import {AppService} from '../../../app.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  status: number;
  duration = null;
  @Input() myCourse: MyCourse;

  constructor(public appService: AppService,
              private router: Router,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.duration = this.appService.moment(this.myCourse.start).to(this.appService.moment(this.myCourse.end), true);
    this.status = this.appService.getStatus(this.myCourse);
  }
  
  round(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100; 
  }

  getUntil(date) {
    const now = this.appService.moment(new Date());
    const to = this.appService.moment(date);
    return this.appService.moment(to.diff(now)).format('DD : HH : mm');
  }

  getUntilText(date) {
    const now = this.appService.moment(new Date());
    const to = this.appService.moment(date);
    return now.to(to);
  }

  goToTest() {
    this.appService.myCourse = { ...this.myCourse };
    const test = this.myCourse.course.test.filter(item => item.type === 1)[0];
    if (test) {
        this.router.navigate(['/profile/courses/test/' + test.id]);
    }
  }

  // getInterval() {
  //   return
  // }
}
