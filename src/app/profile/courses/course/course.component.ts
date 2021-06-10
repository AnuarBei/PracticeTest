import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Chapter, Module } from '../../profile.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MyCourse } from '../../../training/training.module';
import { AppService } from '../../../app.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  YT: any;
  myCourse: MyCourse;
  chapter: Chapter;
  module: Module;
  tab = 0;
  expandedItemIndex = null;
  status: number;
  player;
  chapterPosition: number;
  modulePosition: number;
  isLoading: boolean = false;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              public appService: AppService,
              private router: Router,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.profileService.getMyCourse(id).subscribe((data: MyCourse) => {
        this.myCourse = data;
        //console.log(this.myCourse);
        this.status = this.appService.getStatus(this.myCourse);
        // this.status = 2;
      });
    });
  }

  round(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100; 
  }

  getUntil(date) {
    const now = this.appService.moment(new Date());
    const start = this.appService.moment(date);
    return this.appService.moment(start.diff(now)).format('DD : HH : mm');
  }

  selectChapter(chapter: Chapter, modulePosition, chapterPosition) {
    //console.log(this.myCourse.chapters_passed >= chapterPosition || this.myCourse.moduls_passed > modulePosition);
    if (this.myCourse.chapters_passed >= chapterPosition || this.myCourse.moduls_passed > modulePosition) {
      this.modulePosition = modulePosition;
      this.chapterPosition = chapterPosition;
      this.chapter = chapter;
      this.loadVideoById(chapter?.video);
    }
  }

  selectModule(module: Module, isAccessible: boolean) {
    if (isAccessible && this.status !== 0) {
      this.module = module;
    }
  }

  goToTest(test, isAccessible: boolean) {
    if (isAccessible) {
      this.appService.myCourse = { ...this.myCourse };
      this.navigate('/profile/courses/test/' + test.id);
    }
  }

  goToTestOrResults(type) {
    if (this.status === 0) return;
    const test = this.myCourse.course.test.filter(item => item.type === type)[0];
    if (type === 1) {
        if (this.myCourse.tested) {
            this.navigate('/profile/courses/test-results/' + test.id);
        } else {
            this.goToTest(test, !this.myCourse.tested);
        }
    } else if (type === 3) {
        console.log(this.myCourse)
        if (this.myCourse.tested_final === 1) {
            this.navigate('/profile/courses/test-results/' + test.id);
        } else {
            this.goToTest(test, this.myCourse.moduls_passed === this.myCourse.moduls_count);
        }
    }
  }

  navigate(route) {
    this.router.navigate([route]);
  }

  toggleModule(index) {
    if (this.status !== 0 && this.myCourse.moduls_passed >= index) {
      this.expandedItemIndex = this.expandedItemIndex === index ? null : index;
    }
  }

  initPlayer(id) {
    this.isLoading = true;
    window['YT'].ready(() => {
      this.player = new window['YT'].Player('video', {
        height: '100%',
        width: '100%',
        videoId: id,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this)
        }
      });
    });
  }

  loadVideoById(id) {
    if (this.player) {
      this.player.loadVideoById(id);
    } else {
      this.initPlayer(id);
    }

  }

  onPlayerReady(event) {
    this.isLoading = false;
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    if (event.data === 0) {
      const moduls_passed = this.myCourse.moduls_passed;
      const chapters_passed = this.myCourse.chapters_passed;

      // if the video was viewed
      if (moduls_passed > this.modulePosition || chapters_passed > this.chapterPosition) {
        return false;
      }

      const newMyCourse = { id: this.myCourse.id, moduls_passed, chapters_passed };

      // if (chapterPosition === numberOfChapters) {
      //   newMyCourse.moduls_passed += 1;
      //   newMyCourse.chapters_passed = 0;
      // } else {
      //   newMyCourse.chapters_passed += 1;
      // }
      newMyCourse.chapters_passed += 1;
      this.myCourse = { ...this.myCourse, ...newMyCourse };
      this.profileService.updateMyCourse(newMyCourse);
    }
  }
}
