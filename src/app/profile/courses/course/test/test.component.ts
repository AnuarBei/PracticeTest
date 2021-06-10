import { Component, OnDestroy, OnInit } from '@angular/core';
import {ProfileService} from '../../../profile.service';
import {NewsItem} from '../../../../news/news.module';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer, Option, Question, Test} from '../../../profile.module';
import {MyCourse} from '../../../../training/training.module';
import {AppService} from '../../../../app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  timerInterval = null;
  test: Test;
  activeQuestion: { value: string, index: number, options: { value: Answer, option: string }[] } = {
    value: null,
    index: null,
    options: []
  };
  answers: Answer[] = [];
  questions: { value: string, options: { value: Option, option: string }[] }[] = [];
  styles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': '15px',
    color: '\#333333'
  };
  alert = null;
  myCourse: MyCourse;
  timer: string;

  constructor(public profileService: ProfileService,
              public route: ActivatedRoute,
              public router: Router,
              public appService: AppService,
              private location: Location) { }

  next() {
    const newIndex = this.activeQuestion.index + 1;
    if (this.test.questions.length === newIndex) {
      this.finish();
    } else {
      this.selectActiveQuestion(newIndex, this.test.questions[newIndex]);
    }
  }

  finish() {
    const isValid = this.isValid();
    if (!isValid) {
      this.alert = 'must-be-answered';
    } else {
      this.profileService.createMyTest(this.answers).subscribe(() => {
        const tested = this.getNumberOfCorrectAnswers() >= this.test.min;
        console.log(this.test, tested)
        if (this.test.type === 3) {
            if (tested && this.myCourse.tested_final !== 2) {
                this.profileService.updateMyCourse({
                    id: this.myCourse.id,
                    tested_final: 1
                });
            }
        } else {
            if (tested && !this.myCourse.tested) {
                this.profileService.updateMyCourse({
                    id: this.myCourse.id,
                    tested: true
                });
            }
            if (tested && this.myCourse.tested) {
                this.profileService.updateMyCourse({
                    id: this.myCourse.id,
                    moduls_passed: this.myCourse.moduls_passed + 1,
                    chapters_passed: 0
                });
            }
        }
       
        this.router.navigate(['/profile/courses/test-results/' + this.test.id], {
          queryParams: {
            status: tested ? 'success' : 'fail'
          }
        });
        this.alert = 'test-passed';
      });
    }
    // this.alert = 'time-is-up';
  }

  getResult(event) {
    this.alert = null;
    if (event === 'view-results') {
      this.router.navigate(['/profile/courses/test-results/' + this.test.id]);
    } else if (event === 'done' || event === 'close') {
      this.location.back();
    } else if (event === 'select-date') {
      this.router.navigate(['/training/' + this.test.course]);
      // this.router.navigate(['/training/' + this.appService.myCourse.course.id]);
    }
    //console.log(event);
  }

  ngOnInit(): void {
    if (!this.appService.myCourse) {
      this.location.back();
    }
    this.myCourse = { ...this.appService.myCourse };
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.profileService.getTest(id).subscribe((data: Test) => {
        this.test = data;
        this.startTimer(this.test.duration);
        if (this.test.attempts >= this.test.max) {
          this.router.navigate(['/profile/courses/' + this.myCourse.id]);
        } else {
          this.profileService.incrementAttempt(this.test.id);
        }
        if (this.test.questions.length) {
          this.selectActiveQuestion(0, this.test.questions[0]);
        }
      });
    });
  }

  selectActiveQuestion(index, question: Question) {
    this.activeQuestion.value = question.value;
    this.activeQuestion.index = index;
    this.activeQuestion.options = [];
    question.options.forEach((option: Option) => {
      this.activeQuestion.options.push({
        value: { option: option.id },
        option: option.option
      });
    });
  }

  isValid() {
    let answered = true;
    for (let i = 0; i < this.answers.length; i += 1) {
        if (!this.answers[i] || !this.answers[i].option) answered = false;
    }
    return answered && this.answers.length === this.test.questions.length;
  }

  getNumberOfCorrectAnswers(): number {
    let correctAnswers = 0;
    for (let x = 0; x < this.test.questions.length; x += 1) {
      for (let i = 0; i < this.test.questions[x].options.length; i += 1) {
        if (this.test.questions[x].options[i].correct && this.test.questions[x].options[i].id === this.answers[x].option) {
          correctAnswers += 1;
        }
      }
    }
    return correctAnswers;
  }

  startTimer(duration) {
    let milliseconds = duration * 60 * 1000;
    this.timerInterval = setInterval(() => {
      this.timer = this.appService.moment(milliseconds).format('mm:ss');
      milliseconds -= 1000;
      if (milliseconds === 0) {
        this.finish();
        this.router.navigate(['/profile/courses/test-results/' + this.test.id], { queryParams: { status: 'time-is-up' } });
        this.alert = 'time-is-up';
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  ngOnDestroy():void {
    clearInterval(this.timerInterval);
  }
}
