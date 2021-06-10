import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Contacts} from '../contacts/contacts.model';
import {SocialMedia} from './footer.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contacts: Contacts;
  socialMedia: SocialMedia;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getContactsInfo();
    this.getSocialMediaInfo();
  }

  getContactsInfo() {
    this.appService.getContactsInfo().subscribe((data: Contacts) => {
      this.contacts = data;
    });
  }

  getSocialMediaInfo() {
    this.appService.getSocialMediaInfo().subscribe((data: SocialMedia) => {
      this.socialMedia = data;
    });
  }
}
