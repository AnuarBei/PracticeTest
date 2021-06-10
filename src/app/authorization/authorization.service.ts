import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from './authorization.module';
import {AppService} from '../app.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  base = 'https://srh.org.kz/api/';

  constructor(private http: HttpClient) { }

  authenticate(credentials: Credentials) {
    return this.http.post(this.base + 'auth-token/', credentials);
  }
}
