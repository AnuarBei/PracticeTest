import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  @Input() user;
  genders = [
    { text: 'Мужской', value: 'male' },
    { text: 'Женский', value: 'female' }
  ];
  cities: { text: string; value: string }[] = [];
  languages = [
    { text: 'Русский', value: 'ru' },
    { text: 'Казахский', value: 'kk' }
  ];
  occupations = [
    { text: 'Cпециалист с медицинскимобразованием', value: 1 },
    { text: 'Специалист без медицинского образования', value: 2 },
    { text: 'Студент-обучающийся', value: 3 }
  ];

  constructor(public registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.registrationService.getCities().subscribe((data: any) => {
      data.results.forEach((city: { name: string }) => {
        this.cities.push({ text: city.name, value: city.name });
      });
    });
  }
}
