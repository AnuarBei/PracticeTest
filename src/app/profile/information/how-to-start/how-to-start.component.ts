import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-how-to-start',
  templateUrl: './how-to-start.component.html',
  styleUrls: ['./how-to-start.component.scss']
})
export class HowToStartComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
