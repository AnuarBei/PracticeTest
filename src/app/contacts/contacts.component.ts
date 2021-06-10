import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Contacts} from './contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contacts;
  constructor(public appService: AppService) { }

  days = {
    Mon: 'Понедельник',
    Tue: 'Вторик',
    Wed: 'Среда',
    Thu: 'Четверг',
    Fri: 'Пятница',
    Sat: 'Суббота',
    Sun: 'Воскресенье'
  };

  ngOnInit(): void {
    this.getContactsInfo();
  }

  getContactsInfo() {
    this.appService.getContactsInfo().subscribe((data: Contacts) => {
      this.contacts = data;
    });
  }
}
