import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ContextService } from '../../providers';
import { PaymentManagementPendingComponent } from './components/payment-management-pending/payment-management-pending.component';
import { PaymentManagementPlayersComponent } from './components/payment-management-players/payment-management-players.component';

@IonicPage({
    name: 'PaymentManagementPage',
    segment: 'paymentsManagement'
})
@Component({
  selector: 'fwf-payment-management',
  templateUrl: './payment-management.component.html'
})
export class PaymentManagementPageComponent implements OnInit {

    hasPermission = false;
    selectedOption = 'players';

    @ViewChild('pendingPaymentsTab') pendingPaymentsTab: PaymentManagementPendingComponent;
    @ViewChild('playersTab') playersTab: PaymentManagementPlayersComponent;

    constructor(
        private context: ContextService,
    ) { }

    ngOnInit() {
        this.hasPermission = this.context.userLoggedIsAdmin() || this.context.userLoggedIsTreasurer();
    }

    onSelectionChanged(selectedOption: string) {
        this.selectedOption = selectedOption;
    }

    addPayments() {
        if (!!this.playersTab) {
          this.playersTab.addPayments();
        } else {
          this.pendingPaymentsTab.addPayments();
        }
    }
}
