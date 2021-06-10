import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {
  @Input() image: string = null;
  @Input() thumb: string = null;
  constructor() {
  }

  ngOnInit(): void {
  }
}
