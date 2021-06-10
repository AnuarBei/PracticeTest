import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {NewsService} from '../news/news.service';
import {MyCourse} from '../training/training.module';
import {ActivatedRoute, Router} from '@angular/router';
import {Book, Course} from '../profile/profile.module';
import {NewsItem} from '../news/news.module';
import {AppService} from '../app.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = null;
  courses: Course[] = [];
  news: NewsItem[] = [];
  library: Book[] = [];
  counter = 0;

  constructor(private profileService: ProfileService,
              private newsService: NewsService,
              private route: ActivatedRoute,
              private router: Router,
              public appService: AppService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.query = queryParams['query'];
      this.reset();
      this.search(this.query);
    });
  }

  reset() {
    this.counter = 0;
    this.courses = [];
    this.news = [];
    this.library = [];
  }

  search(query) {
    this.profileService.getCourses({ search: query }).subscribe((data: any) => {
      this.courses = data.results;
      this.counter += data.count;
    });

    this.newsService.getNews({ search: query }).subscribe((data: any) => {
      this.news = data.results;
      this.counter += data.count;
    });

    this.profileService.getLibrary({ search: query, limit: 999, offset: 0 }).subscribe((data: any) => {
      this.library = data.results;
      this.counter += data.count;
    });
  }

  navigate(route) {
    this.router.navigate([route]);
  }
}
