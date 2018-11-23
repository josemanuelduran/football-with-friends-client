import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { MyValuationsPageComponent } from './my-valuations.component';

@NgModule({
    declarations: [
        MyValuationsPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(MyValuationsPageComponent),
        TranslateModule
    ],
})
export class MyValuationsPageModule {}
