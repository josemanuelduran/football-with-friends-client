import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('assets/i18n')) {
        request = request.clone({
            // url: `http://192.168.0.157:8100/${request.url}`
            // url: `http://localhost:8100/${request.url}`
            url: `https://fwf-server.herokuapp.com/${request.url}`
        });
    }
    return next.handle(request);
  }
}
