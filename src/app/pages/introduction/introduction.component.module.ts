import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { IntroductionPageComponent } from './introduction.component';

@NgModule({
  declarations: [
    IntroductionPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(IntroductionPageComponent),
    TranslateModule
  ],
})
export class IntroductionPageModule {}
