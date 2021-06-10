import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-fill-in-required-fields-alert',
  templateUrl: './fill-in-required-fields-alert.component.html',
  styleUrls: ['./fill-in-required-fields-alert.component.scss']
})
export class FillInRequiredFieldsAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
