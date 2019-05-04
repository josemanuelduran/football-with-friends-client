import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { TranslateModule } from '@ngx-translate/core';

import { PaymentManagementPageComponent } from './payment-management.component';
import { ComponentsModule } from '../../components/components.module';
import { PaymentManagementPlayersComponent } from './components/payment-management-players/payment-management-players.component';

@NgModule({
    declarations: [
        PaymentManagementPageComponent,
        PaymentManagementPlayersComponent,
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
