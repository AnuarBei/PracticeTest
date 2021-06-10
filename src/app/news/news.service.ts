import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NewsService {
  base = 'https://srh.org.kz/api/';

  constructor(private http: HttpClient) { }

  getNews(params = {}) {
    return this.http.get(this.base + 'news/', { params });
  }

  getNewsItem(id) {
    return this.http.get(this.base + `news/${id}/`);
  }
}
