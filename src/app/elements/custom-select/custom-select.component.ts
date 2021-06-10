import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Output() newValue = new EventEmitter<string>();
  @Input() options = [];
  isOpen = false;
  @Input('value') selected = null;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  setSelected(value) {
    this.options.forEach(option => {
      option.active = option.value === value;
    });
    this.selected = value;
    this.newValue.emit(value);
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
