import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {AppService} from '../../app.service';
import {Certificate} from './certificates.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  constructor(private profileService: ProfileService,
              public appService: AppService) { }

  ngOnInit(): void {
    this.getMyCertificates();
  }

  getMyCertificates() {
    this.profileService.getMyCertificates().subscribe((data: any) => {
      this.certificates = data.results;
    });
  }

}
