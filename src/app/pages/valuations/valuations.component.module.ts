import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { ValuationsPageComponent } from './valuations.component';

@NgModule({
    declarations: [
        ValuationsPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(ValuationsPageComponent),
        TranslateModule
    ],
})
export class ValuationsPageModule {}
