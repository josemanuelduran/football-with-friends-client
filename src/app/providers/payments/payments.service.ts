import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Payment, PaymentsFilter } from '../../models';

const PAYMENT_URL = 'fwf/payment';

@Injectable()
export class PaymentsService {

    constructor(
        private http: HttpClient
    ) { }

    public fetchPayments(playerId: string, filters: PaymentsFilter): Observable<Payment[]> {
        let url = `${PAYMENT_URL}?playerId=${playerId}`;
        if (filters) {
            if (filters.year) {
                url += `&year=${filters.year}`;
            }
            if (filters.showNoPaidPayments && !filters.showPaidPayments) {
                url += '&paid=false';
            } else if (!filters.showNoPaidPayments && filters.showPaidPayments) {
                url += '&paid=true';
            }
        }
        return this.http.get<Payment[]>(url);
    }

    public getPayment(paymentId: string): Observable<Payment> {
        return this.http.get<Payment>(`${PAYMENT_URL}/${paymentId}`);
    }

    public createPayment(payment: Payment): Observable<Object> {
        return this.http.post(PAYMENT_URL, payment);
    }

    public updatePayment(payment: Payment): Observable<Object> {
        return this.http.put(PAYMENT_URL, payment);
    }

    public deletePayment(paymentId: string): Observable<Object> {
        return this.http.delete(`${PAYMENT_URL}/${paymentId}`);
    }

}
