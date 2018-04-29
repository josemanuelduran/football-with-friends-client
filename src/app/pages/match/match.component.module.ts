import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { TranslateModule } from '@ngx-translate/core';

import { MatchPageComponent } from './match.component';

@NgModule({
    declarations: [
        MatchPageComponent,
    ],
    imports: [
        IonicPageModule.forChild(MatchPageComponent),
        TranslateModule,
        MomentModule,
    ],
})
export class MatchPageModule {}
