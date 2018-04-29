import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsControllerComponent } from './tabs-controller';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TabsControllerComponent,
  ],
  imports: [
    IonicPageModule.forChild(TabsControllerComponent),
    TranslateModule,
  ],
})
export class TabsControllerPageModule {}
