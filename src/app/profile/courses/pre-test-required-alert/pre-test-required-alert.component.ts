import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-pre-test-required-alert',
  templateUrl: './pre-test-required-alert.component.html',
  styleUrls: ['./pre-test-required-alert.component.scss']
})
export class PreTestRequiredAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
