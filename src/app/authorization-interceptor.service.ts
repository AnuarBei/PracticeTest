import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from './app.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {
  constructor(private appService: AppService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.appService?.vicAuthData?.token) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', 'Token ' + this.appService?.vicAuthData?.token)
      });
      return next.handle(modifiedRequest);
    } else {
      return next.handle(req);
    }
  }
}
