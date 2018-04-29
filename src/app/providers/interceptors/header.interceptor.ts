import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../authentication/auth.service';
import { HTTP_HEADERS } from '../../models';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url !== 'login/' && !request.url.includes('assets/i18n')) {
            if (request.method === 'POST' || request.method === 'PUT') {
                request = request.clone({
                    headers: request.headers.set(HTTP_HEADERS.CONTENT_TYPE, 'application/json')
                });
            }
        }
        request = request.clone({ headers: request.headers.set(HTTP_HEADERS.ACCEPT, 'application/json') });
        return next.handle(request);
    }
}
