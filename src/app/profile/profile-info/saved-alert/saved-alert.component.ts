import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-saved-alert',
  templateUrl: './saved-alert.component.html',
  styleUrls: ['./saved-alert.component.scss']
})
export class SavedAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
