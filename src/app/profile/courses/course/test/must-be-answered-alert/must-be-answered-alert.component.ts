import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../../app.service';

@Component({
  selector: 'app-must-be-answered-alert',
  templateUrl: './must-be-answered-alert.component.html',
  styleUrls: ['./must-be-answered-alert.component.scss']
})
export class MustBeAnsweredAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
