import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { StatsPageComponent } from './stats.component';

@NgModule({
  declarations: [
    StatsPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(StatsPageComponent),
    TranslateModule
  ],
})
export class StatsPageModule {}
