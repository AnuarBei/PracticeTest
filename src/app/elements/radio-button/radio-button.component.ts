import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../profile/profile.module';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Output() newValue = new EventEmitter<any>();
  @Input() options = [];
  @Input() disabled: boolean = false;
  @Input() answer: Answer = { option: null };
  @Input() styles = {};
  constructor() { }

  ngOnInit(): void {
  }

  emitNewValue(event) {
    this.newValue.emit(event.value);
  }
}
