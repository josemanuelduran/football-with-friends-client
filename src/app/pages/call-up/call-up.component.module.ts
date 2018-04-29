import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { CallUpPageComponent } from './call-up.component';

@NgModule({
    declarations: [
        CallUpPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(CallUpPageComponent),
        TranslateModule
    ],
})
export class CallUpPageModule {}
