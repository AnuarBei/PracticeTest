import { Component, OnInit } from '@angular/core';
import {About} from '../main/main.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutInfo: About;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getAboutInfo();
  }

  getAboutInfo() {
    this.appService.getAboutInfo().subscribe((data: About) =>  {
      //console.log(data);
      this.aboutInfo = data;
    });
  }
}
