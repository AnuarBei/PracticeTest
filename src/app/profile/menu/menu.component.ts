import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu = [
    { name: 'home', path: '/profile' },
    { name: 'profileInfo', path: 'profile-info' },
    { name: 'information', path: 'information' },
    { name: 'plan', path: 'plan' },
    { name: 'courses', path: 'courses' },
    { name: 'certificates', path: 'certificates' },
    { name: 'library', path: 'library' },
    { name: 'reference', path: 'reference' },
    { name: 'feedback', path: 'feedback' }
  ];
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.menu = [
          { name: 'information', path: 'information' },
          { name: 'plan', path: 'plan' }
        ];
      }
    });
  }

}
