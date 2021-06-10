import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-numberpicker',
  templateUrl: './numberpicker.component.html',
  styleUrls: ['./numberpicker.component.scss']
})
export class NumberpickerComponent implements OnInit {
  @Output() newValue = new EventEmitter<number>();
  @Input() value = 0;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  changeBy(data: number) {
    //console.log(this.value);
    if (new Date().getFullYear() <= this.value + data) {
      this.value += data;
      this.newValue.emit(this.value);
    }
  }
}
