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

import { BusyIndicatorService } from '../busy-indicator/busy-indicator.service';

@Injectable()
export class BusyIndicatorInterceptor implements HttpInterceptor {
    constructor(public busyService: BusyIndicatorService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.includes('assets/') && !this.busyService.isBusyIndicatorVisible()) {
            this.busyService.loadingAnimationStart();
        }
        return next.handle(request).do(evt => {
            if (evt instanceof HttpResponse) {
                if (!evt.url.includes('assets/') && this.busyService.isBusyIndicatorVisible()) {
                    this.busyService.loadingAnimationEnd();
                }
            }
        });
    }
}
