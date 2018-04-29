import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { HTTP_HEADERS, User } from '../../../models';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<User> {
        let {url, headers} = this.requestParametersForLogin(username, password);
        return this.http.get<User>(url, {headers: headers});

    }

    private requestParametersForLogin(username: string, password: string): {url: string, headers: HttpHeaders} {
        let url = 'login/';
        const headers: HttpHeaders = new HttpHeaders({
            [HTTP_HEADERS.AUTHORIZATION]: HTTP_HEADERS.BASIC_PREFIX + ' ' + btoa(username + ':' + password),
            [HTTP_HEADERS.CONTENT_TYPE]: 'application/x-www-form-urlencoded'
        });
        return {url, headers};
    }


}
