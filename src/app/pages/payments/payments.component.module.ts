import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { PaymentsPageComponent } from './payments.component';
import { ComponentsModule } from '../../components/components.module';
import { PaymentsService } from '../../providers';

@NgModule({
    declarations: [
        PaymentsPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(PaymentsPageComponent),
        TranslateModule,
        ComponentsModule
    ],
    providers: [
        PaymentsService
    ]
})
export class PaymentsPageModule {}
