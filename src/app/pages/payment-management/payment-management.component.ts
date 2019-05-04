import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ContextService } from '../../providers';

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

    constructor(
        private context: ContextService,
    ) { }

    ngOnInit() {
        this.hasPermission = this.context.userLoggedIsAdmin() || this.context.userLoggedIsTreasurer();
    }

    onSelectionChanged(selectedOption: string) {
        this.selectedOption = selectedOption;
    }
}
