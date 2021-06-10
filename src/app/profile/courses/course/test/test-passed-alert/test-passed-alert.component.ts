import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../../app.service';

@Component({
  selector: 'app-test-passed-alert',
  templateUrl: './test-passed-alert.component.html',
  styleUrls: ['./test-passed-alert.component.scss']
})
export class TestPassedAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
