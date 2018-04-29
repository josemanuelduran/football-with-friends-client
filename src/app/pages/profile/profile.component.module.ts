import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { ProfilePageComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePageComponent),
    TranslateModule
  ],
})
export class ProfilePageModule {}
