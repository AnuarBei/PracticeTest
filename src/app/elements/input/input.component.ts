import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() value = null;
  @Input() type = 'text';
  @Output() newValue = new EventEmitter<string>();

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  emitNewValue(event) {
    this.newValue.emit(event.target.value);
  }
}
