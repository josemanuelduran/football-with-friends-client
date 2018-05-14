import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { DiscardsPageComponent } from './discards.component';

@NgModule({
    declarations: [
        DiscardsPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(DiscardsPageComponent),
        TranslateModule
    ],
})
export class CallUpPageModule {}
