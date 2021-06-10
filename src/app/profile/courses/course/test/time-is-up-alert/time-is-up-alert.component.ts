import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../../app.service';

@Component({
  selector: 'app-time-is-up-alert',
  templateUrl: './time-is-up-alert.component.html',
  styleUrls: ['./time-is-up-alert.component.scss']
})
export class TimeIsUpAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
