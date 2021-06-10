import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {Information} from './information.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  information: Information;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getForStudentsInfo();
  }

  getForStudentsInfo() {
    this.appService.getForStudentsInfo().subscribe((data: Information) => {
      this.information = data;
    });
  }
}
