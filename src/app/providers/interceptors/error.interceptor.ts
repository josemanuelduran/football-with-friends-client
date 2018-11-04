import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { App } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private app: App,
        private translate: TranslateService,
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(errorResponse => {
                let errMsg: string;
                if (errorResponse instanceof HttpErrorResponse) {
                    if (errorResponse.status === 401) {
                        this.app.getRootNav().setRoot('LoginPage');
                        errMsg = this.translate.instant('EXPIRED_SESSION');
                    } else if (errorResponse.status === 409) {
                        errMsg = errorResponse.error.message;
                    } else {
                        const err = errorResponse.message || JSON.stringify(errorResponse.error);
                        errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;
                    }
                } else {
                    errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
                }
                return _throw(errMsg);
            });
    }
}
