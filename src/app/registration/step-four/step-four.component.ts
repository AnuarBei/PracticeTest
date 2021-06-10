import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {
  @Input() user;
  @Input() passwordInvalid;
  constructor() { }

  ngOnInit(): void {
  }
}
