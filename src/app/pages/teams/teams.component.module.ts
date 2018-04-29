import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { TeamsPageComponent } from './teams.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TeamsPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(TeamsPageComponent),
    TranslateModule,
    ComponentsModule
  ],
})
export class TeamsPageModule {}
