import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
  ],
  entryComponents: [],
  imports: [
    IonicPageModule.forChild(LoginPageComponent),
    TranslateModule,
  ],
  providers: [
      LoginService
  ]
})
export class LoginPageModule {}
