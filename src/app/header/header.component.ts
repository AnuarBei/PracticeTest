import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {ProfileService} from '../profile/profile.service';
import {NewsService} from '../news/news.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CallCenter} from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  callCenter: CallCenter;
  isOnSearch = false;
  query = null;
  results: any[] = [];
  courseSub: Subscription;
  newsSub: Subscription;
  librarySub: Subscription;

  isLoggedIn = false;
  showDialog = false;
  user;
  linkHover = false;
  profileLinkHover = false;
  isSearchActivated = false;

  routeChangeSub: Subscription;
  currentRoute = null;

  constructor(private router: Router,
              public appService: AppService,
              private profileService: ProfileService,
              private newsService: NewsService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.appService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.user = this.appService.vicAuthData?.user;
    });

    // first time
    this.appService.loggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.user = this.appService.vicAuthData.user;
    });

    this.routeChangeSub = this.router.events.subscribe(val => {
      this.currentRoute = this.router.url;
    });
    this.getCallCenterInfo();
  }

  navigate(route) {
    this.router.navigate([route]);
  }

  getCallCenterInfo() {
    this.appService.getCallCenterInfo().subscribe((data: CallCenter) => {
      this.callCenter = data;
    });
  }

  getResult(answer) {
    if (answer) {
      this.appService.logOut();
    }
    this.showDialog = false;
  }

  goToSearchPage() {
    this.router.navigate([`/search`], {
      queryParams: {
        query: this.query
      }
    });
    this.isSearchActivated = false;
  }

  reset() {
    this.results = [];
    if (this.courseSub && this.newsSub && this.librarySub) {
      this.courseSub.unsubscribe();
      this.newsSub.unsubscribe();
      this.librarySub.unsubscribe();
    }
  }

  search(query) {
    this.reset();
    this.courseSub = this.profileService.getCourses({ search: query }).subscribe((data: any) => {
      this.results.push(...data.results);
    });

    this.newsSub = this.newsService.getNews({ search: query }).subscribe((data: any) => {
      this.results.push(...data.results);
    });

    this.librarySub = this.profileService.getLibrary({ search: query, limit: 999, offset: 0 }).subscribe((data: any) => {
      this.results.push(...data.results);
    });
  }

  setQuery(event) {
    this.query = event.target.value;
    this.search(this.query);
  }

  goToResult(result) {
    if (result?.file) {
      window.open(result.file, '_blank');
    } else if (result.title) {
      this.navigate('/news/' + result.id);
    } else {
      this.navigate('/training/' + result.id);
    }
    this.isSearchActivated = false;
  }

  closeSearch() {
    if (!this.isOnSearch) {
      this.isSearchActivated = false;
    }
  }

  ngOnDestroy() {
    this.routeChangeSub.unsubscribe();
  }

  switchMode() {
    this.appService.isOnImpairedMode = !this.appService.isOnImpairedMode;
  }

  switchLanguage(language) {
    this.appService.language = language;
    this.translate.use(language);
  }
}
