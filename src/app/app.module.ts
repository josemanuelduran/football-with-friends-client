import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FootballWithFriendsAppComponent } from './app.component';
import {
    GlobalService,
    ContextService,
    MatchesService,
    PlayersService,
    AuthService,
    TokenInterceptor,
    UrlInterceptor,
    HeaderInterceptor,
    BusyIndicatorInterceptor,
    BusyIndicatorService,
} from './providers';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [
        FootballWithFriendsAppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(FootballWithFriendsAppComponent, {}),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ComponentsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Keyboard,
        StatusBar,
        SplashScreen,
        Vibration,
        InAppBrowser,
        GlobalService,
        AuthService,
        ContextService,
        MatchesService,
        PlayersService,
        BusyIndicatorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlInterceptor,
            multi: true,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: BusyIndicatorInterceptor,
            multi: true,
          }
    ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
