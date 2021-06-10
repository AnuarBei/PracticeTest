import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-email-is-required',
  templateUrl: './email-is-required.component.html',
  styleUrls: ['./email-is-required.component.scss']
})
export class EmailIsRequiredComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
