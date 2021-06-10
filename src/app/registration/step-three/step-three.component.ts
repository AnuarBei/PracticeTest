import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegistrationService} from '../registration.service';
import {Education} from '../../profile/profile.module';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  @Input() user;
  @Input() education: Education;
  specialities: { text: string; value: string }[] = [];
  educationTypes: { text: string; value: string }[] = [
      { text: "ТиПО", value: "ТиПО" },
      { text: "среднее специальное", value: "среднее специальное" },
      { text: "бакалавриат", value: "бакалавриат" },
      { text: "интернатура", value: "интернатура" },
      { text: "резидентура", value: "резидентура" },
      { text: "специализация", value: "специализация" },
      { text: "другое", value: "другое" }
  ];

  constructor(public registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities() {
    this.registrationService.getSpecialities().subscribe((data: any) => {
      //console.log(data);
      data.results.forEach((speciality: { name: string }) => {
        this.specialities.push({ text: speciality.name, value: speciality.name });
      });
    });
  }
}
