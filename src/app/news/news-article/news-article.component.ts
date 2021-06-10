import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsItem } from '../news.module';
import {NewsService} from '../news.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  newsItem: NewsItem;

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              public appService: AppService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.newsService.getNewsItem(id).subscribe((data: NewsItem) => {
        this.newsItem = data;
      });
    });
  }

}
