import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-choose-course-alert',
  templateUrl: './choose-course-alert.component.html',
  styleUrls: ['./choose-course-alert.component.scss']
})
export class ChooseCourseAlertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
