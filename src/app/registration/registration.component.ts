import { Component, OnInit } from '@angular/core';
import {RegistrationService} from './registration.service';
import {Router} from '@angular/router';
import {Education, User, Workplace} from '../profile/profile.module';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  passwordInvalid: boolean = false;
  requiredFields: string[][] = [
    ['surname', 'name', 'gender', 'region', 'doc1', 'lang', 'phone', 'occupation'],
    ['name_org', 'position', 'spec'],
    ['name_org', 'type', 'spec', 'doc'],
    ['email', 'password', 'password_confirmation']
  ];
  manageUserObservable: Observable<any>;
  showDialog = false;
  showEmailDialog = false;
  step = 1;
  user = {
    id: null,
    surname: null,
    name: null,
    patronymic: null,
    birth_date: null,
    gender: null,
    phone: null,
    region: null,
    doc1: null,
    lang: null,
    email: null,
    password: null,
    password_confirmation: null,
    occupation: null
  };
  workplace: Workplace = {
    id: null,
    name_org: null, // required
    date_start: '2020-11-16', // required
    position: null, // required
    spec: null, // required
    doc: null,
    user: null // required
  };
  education: Education = {
    id: null,
    name_org: null, // required
    type: null, // required
    spec: null, // required
    doc: null,
    user: null // required
  };
  constructor(private registrationService: RegistrationService,
              private router: Router,
              public appService: AppService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    if (this.appService.user) {
      const user: any = { ...this.appService.user };
      [user.surname, user.name, user.patronymic] = user.full_name.split(' ');
      this.education = { ...user.educations[0] };
      this.workplace = { ...user.workplaces[0] };
      delete user.full_name;
      delete user.educations;
      delete user.workplaces;
      user.password = user.password_confirmation = null;
      this.user = user;
    }
  }

  nextStep() {
    this.registrationService.getData.next(null);
    const isValid = this.isValid();
    if (isValid) {
      if (this.step === 4) {
        this.manageUser();
      } else {
        if (this.step === 1 && this.user.occupation === 3) this.step += 1;
        this.step += 1;
      }
    } else {
      this.showDialog = true;
    }
  }

  manageUser() {
    const user = { ...this.user, full_name: null };
    if (!user.patronymic) { user.patronymic = ''; }
    user.full_name = user.surname + ' ' + user.name + ' ' + user.patronymic;
    delete user.surname;
    delete user.name;
    delete user.patronymic;

    this.manageUserObservable = this.registrationService.createUser(user);
    if (this.user.id) {
      this.manageUserObservable = this.registrationService.updateUser(user);
    }

    this.manageUserObservable.subscribe((data: User) => {
      this.appService.language = data.lang;
      this.translate.use(data.lang);

      const workplace = { ...this.workplace, user: data.id };
      const education = { ...this.education, user: data.id };

      if (this.user.occupation !== 3) {
        if (this.workplace.id) {
            this.registrationService.updateWorkplace(workplace);
        } else {
            this.registrationService.createWorkplace(workplace);
        }
      }

      if (this.education.id) {
        this.registrationService.updateEducation(education);
      } else {
        this.registrationService.createEducation(education);
      }
      this.router.navigate(['/']);
    }, error => {
      if (error.error.hasOwnProperty('email')) {
        this.step = 1;
        this.showEmailDialog = true;
      }
    });
  }

  isValid(): boolean {
    this.passwordInvalid = false;
    let fields: any = { ...this.user };
    if (this.step === 2) {
      fields = { ...this.workplace };
    } else if (this.step === 3) {
      fields = { ...this.education };
    } else if (this.step === 4 && 
        ((fields.password && fields.password.length < 6) || 
        fields.password !== fields.password_confirmation || 
        !this.passwordRegex.test(fields.password))) {
      this.passwordInvalid = true;
      return false;
    }
    for (const key of this.requiredFields[this.step - 1]) {
      //console.log(fields[key], key);
      if (this.user.occupation === 3 && this.step === 3 && key === 'doc') continue;
      if (!fields[key]) {
        return false;
      }
    }
    return true;
  }

  setUser(user) {
    this.user = { ...this.user, ...user };
  }

  getResult(event) {
    this.showDialog = false;
    this.showEmailDialog = false;
  }
}
