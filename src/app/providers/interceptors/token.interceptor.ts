import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../authentication/auth.service';
import { HTTP_HEADERS } from '../../models';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url !== 'login/' && !request.url.includes('assets/i18n')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${HTTP_HEADERS.TOKEN_PREFIX} ${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request).do(evt => {
            if (evt instanceof HttpResponse) {
                let authHeader = evt.headers.get(HTTP_HEADERS.AUTHORIZATION);
                if (authHeader) {
                    this.auth.saveToken(authHeader.slice((HTTP_HEADERS.TOKEN_PREFIX + ' ').length));
                }
            }
        });
    }
}
