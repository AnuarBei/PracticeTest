import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../profile.service';
import {Answer, Option, Question, Test} from '../../../profile.module';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../../app.service';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  myTests: { text: string, value: number }[] = [];
  myTest: { text: string, value: number };
  correctAnswers = 0;
  status = 'overview';
  test: Test;
  activeQuestion: { value: string, index: number, options: { value: { option: number }, option: string }[] } = {
    value: null,
    index: null,
    options: []
  };
  answers: Answer[] = [];
  questions: { value: string, options: { value: Option, option: string }[] }[] = [];

  alert = null;

  attempts = 0;
  question = 0;
  style = { height: '40px', width: '440px', padding: '10px 16px' };
  variants = [
    'наука, изучающая строение тела1',
    'наука, изучающая строение тела2',
    'наука, изучающая строение тела3',
    'наука, изучающая строение тела4',
    'наука, изучающая строение тела5'
  ];
  styles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': '15px',
    color: '\#333333'
  };
  testTypes = ["Предварительный", "Модульный", "Финальный"];

  constructor(public profileService: ProfileService,
              public route: ActivatedRoute,
              public router: Router,
              public appService: AppService,
              private location: Location,
              public translate: TranslateService) { }

  next() {
    if (this.test.questions.length === this.activeQuestion.index + 1) {

    } else {
      this.activeQuestion.index += 1;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getMyTest(id);
    });
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.status) {
        this.status = queryParams.status;
      }
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

  getCorrectOption(question: Question): Option {
    let correctOption: Option;
    question.options.forEach((option: Option) => {
      if (option.correct) {
        correctOption = option;
      }
    });
    return correctOption;
  }

  goBack() {
    this.location.back();
  }

  close() {
    this.navigate(`/profile/courses`);
  }

  getNumberOfCorrectAnswers() {
    for (let x = 0; x < this.test.questions.length; x += 1) {
      for (let i = 0; i < this.test.questions[x].options.length; i += 1) {
        if (this.test.questions[x].options[i].correct && this.test.questions[x].options[i].id === this.answers[x].option) {
          this.correctAnswers += 1;
        }
      }
    }
  }

  navigate(route) {
    this.router.navigate([route]);
  }

  getResults(id) {
    this.myTest = this.myTests.filter(myTest => myTest.value === +id)[0];
    this.navigate('/profile/courses/test-results/' + id);
  }

  getMyTest(id) {
    this.profileService.getMyTest(id).subscribe((data: { answers: Answer[], test: Test }) => {
      if (!data.answers.length) {
          this.navigate(`/profile/courses`);
      }
      this.test = data.test;
      this.answers = data.answers;
      this.getNumberOfCorrectAnswers();
      if (!this.myTests.length) {
        this.getMyTests();
      }
      if (this.test.questions.length) {
        this.selectActiveQuestion(0, this.test.questions[0]);
      }
    });
  }

  getMyTests() {
    this.profileService.getMyTests(this.test.course).subscribe((response: { module: number; answers: Answer[]; test: Test}[]) => {
      this.myTests = [];
      console.log(response, 'response')
      for (let i = 0; i < response.length; i += 1) {
        this.myTests.push({
          text: response[i].module ? 'Тест по модулю ' + response[i].module : this.testTypes[response[i].test.type - 1],
          value: response[i].test.id
        });
      }
      if (this.myTests.length) {
          this.myTest = this.myTests[0];
      }
    });
  }
}
