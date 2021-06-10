import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivationStart, Router} from '@angular/router';
import {AppService} from '../app.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  routeName = null;
  // routes = {
  //   ''
  //   'authorization'
  //   'password-recovery'
  //   'registration'
  //   'search'
  //   'contacts'
  //   'news'
  //   'news/:id'
  //   'profile'
  //   'profile-info'
  //   'information'
  //   'plan'
  //   'courses'
  //   'courses/test/:id'
  //   'courses/test-results/:id'
  //   'courses/:id'
  //   'certificates'
  //   'library'
  //   'reference'
  //   'feedback'
  //   'training/:id'
  // }
  constructor(private router: Router,
              public route: ActivatedRoute,
              public appService: AppService) { }

  ngOnInit(): void {
    // console.log(this.route.data)
    // this.route.data.subscribe(val => {
    //   console.log(val);
    // });
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.routeName = event.snapshot.data?.routeName;
      }
    });
  }

}
