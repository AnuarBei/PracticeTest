import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {About, OurStudents} from './main.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  aboutInfo: About;
  ourStudents: OurStudents;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getAboutInfo();
    this.getOurStudents();
  }

  getAboutInfo() {
    this.appService.getAboutInfo().subscribe((data: About) =>  {
      this.aboutInfo = data;
    });
  }

  getOurStudents() {
    this.appService.getOurStudents().subscribe((data: OurStudents) =>  {
      this.ourStudents = data;
    });
  }
}
