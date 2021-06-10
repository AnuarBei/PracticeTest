import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {Reference} from './reference.model';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {
  reference: Reference;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getReferenceInfo();
  }

  getReferenceInfo() {
    this.appService.getReferenceInfo().subscribe((data: Reference) => {
      this.reference = data;
    });
  }
}
