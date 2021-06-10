import {Component, Input, OnInit} from '@angular/core';
import {Certificate} from '../certificates.model';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.scss']
})
export class CertificateCardComponent implements OnInit {
  @Input() certificate: Certificate;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
