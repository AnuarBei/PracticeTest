import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() width: string = null;
  @Input() height: string = null;
  @Input() buttonType: string = null;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
