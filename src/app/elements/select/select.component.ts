import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() value;
  @Input() style = {};
  @Input() required = false;
  @Input() label = '';
  @Input() options = [];
  @Output() newValue = new EventEmitter<string>();

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    if (!this.value) {
      this.value = 'Не выбрано';
    }
  }

  emitNewValue(event) {
    this.newValue.emit(event.target.value);
  }
}
