import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegistrationService} from '../registration.service';
import {Workplace} from '../../profile/profile.module';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Input() workplace: Workplace;
  jobSpecialities: { text: string; value: string }[] = [];

  constructor(public registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getJobSpecialities();
  }

  getJobSpecialities() {
    this.registrationService.getJobSpecialities().subscribe((data: any) => {
      data.results.forEach((jobSpeciality: { name: string }) => {
        this.jobSpecialities.push({ text: jobSpeciality.name, value: jobSpeciality.name });
      });
    });
  }
}
