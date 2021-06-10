import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Input() label = '';
  @Input() required = false;
  @Input() hint = '';
  isUploaded = false;
  @Output() newValue = new EventEmitter<string>();
  @Input('value') file;
  image = null;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    if (this.file) {
      this.image = this.file;
    }
  }

  resetFileInput() {
    this.file = null;
    this.image = null;
    this.newValue.emit(null);
  }

  handleFileInput(event) {
    let file = event.target.files[0];
    if (!file) { file = null; }
    this.newValue.emit(file);
    this.file = file;
    this.readURL(file);
  }

  readURL(file) {
    if (file) {
      this.image = URL.createObjectURL(file);
    }
  }
}
