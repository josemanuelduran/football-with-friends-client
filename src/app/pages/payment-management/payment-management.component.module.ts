import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { TranslateModule } from '@ngx-translate/core';

import { PaymentManagementPageComponent } from './payment-management.component';
import { ComponentsModule } from '../../components/components.module';
import { PaymentManagementPlayersComponent } from './components/payment-management-players/payment-management-players.component';
import { PaymentManagementPendingComponent } from './components/payment-management-pending/payment-management-pending.component';

@NgModule({
    declarations: [
        PaymentManagementPageComponent,
        PaymentManagementPlayersComponent,
        PaymentManagementPendingComponent,
    ],
    imports: [
        IonicPageModule.forChild(PaymentManagementPageComponent),
        TranslateModule,
        ComponentsModule,
        MomentModule,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class PaymentManagementPageModule {}
