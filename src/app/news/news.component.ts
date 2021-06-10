import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from './news.service';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { NewsItem } from './news.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() isInMain = false;
  news: NewsItem[] = [];
  constructor(private newsService: NewsService,
              public appService: AppService,
              private router: Router) { }

  ngOnInit(): void {
    this.newsService.getNews()
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        map((data: NewsItem[]) => {
          const news: NewsItem[] = [];
          data.forEach((newsItem: NewsItem) => {
            news.push({
              ...newsItem,
              created_at: this.appService.moment(newsItem.created_at).format('DD.MM.YYYY')
            });
          });
          return news;
        })
      )
      .subscribe((data: NewsItem[]) => {
        this.news = data;
      });
  }

  navigateToArticle(id) {
    this.router.navigate([`/news/${id}`]);
  }
}
