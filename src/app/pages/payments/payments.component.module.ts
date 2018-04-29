import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { PaymentsPageComponent } from './payments.component';

@NgModule({
    declarations: [
        PaymentsPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(PaymentsPageComponent),
        TranslateModule
    ],
})
export class PaymentsPageModule {}
