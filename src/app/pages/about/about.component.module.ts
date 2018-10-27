import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { AboutPageComponent } from './about.component';

@NgModule({
  declarations: [
    AboutPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(AboutPageComponent),
    TranslateModule
  ],
})
export class StatsPageModule {}
