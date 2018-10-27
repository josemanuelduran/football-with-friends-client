import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import 'moment/src/locale/es';


// import { User } from './models';

@Component({
    templateUrl: 'app.template.html'
})
export class FootballWithFriendsAppComponent implements OnInit, OnDestroy {
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    rootPage: string;

    httpSubscription: Subscription;
    private authSubscription: Subscription;
    // private userLogged: User;

    constructor(private platform: Platform,
                private storage: Storage,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private translate: TranslateService,
                // private busyIndicator: BusyIndicatorService,
                // private http: HttpClient,
            ) {

        // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial').then((hasSeenTutorial) => {
            if (hasSeenTutorial) {
                this.rootPage = 'LoginPage';
            } else {
                this.rootPage = 'IntroductionPage';
            }
            this.initializeApp();
            this.initializeConfig();
            this.initializeTranslateConfig();
        });
    }

    ngOnInit(): void {
        this.subscribeToHttpEvents();
        this.subscribeToLoginEvents();
    }

    private subscribeToHttpEvents(): void {
        // this.httpSubscription = this.http.httpEvent$.subscribe(this.handleHttpEvents.bind(this));
    }

    private subscribeToLoginEvents(): void {
        // this.userLogged = user;
    }

    ngOnDestroy(): void {
        // prevent memory leak when component is destroyed
        this.httpSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    menuItemSelected(item: string) {
        if (item === 'tiles.logout') {
            this.nav.setRoot('LoginPage');
            return;
        } else if (item === 'tiles.introduction') {
            this.nav.setRoot('IntroductionPage');
            return;
        } else if (item === 'tiles.about') {
            this.nav.setRoot('AboutPage');
            return;
        }


        let index: number;
        switch (item) {
            case 'tiles.matches':
                index = 0;
                break;
            case 'tiles.profile':
                index = 1;
                break;
            case 'tiles.payments':
                index = 2;
                break;
            case 'tiles.stats':
                index = 3;
                break;
            default:
                index = 0;
                break;
        }
        this.nav.setRoot('TabsController', {indexSelected: index});
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.hideSplashScreen();
        });
    }

    private initializeConfig() {
        // this.configService.loadBaseConfig();
    }

    // TODO Move translate configuration to config service
    private initializeTranslateConfig(): void {
        let userLang = navigator.language.split('-')[0];
        userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
        moment.locale(userLang);
    }

    private hideSplashScreen() {
        if (this.splashScreen) {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100);
        }
    }

    // private handleHttpEvents(event: string): void {
        // if (event === HTTP_EVENTS.HTTP_END) {
        //     this.busyIndicator.loadingAnimationEnd();
        // } else if (event === HTTP_EVENTS.HTTP_START) {
        //     this.busyIndicator.loadingAnimationStart();
        // } else if (event === HTTP_EVENTS.HTTP_TOKEN_EXPIRED) {
        //     this.storeAuth.dispatch(new Auth.Logout());
        // }
    // }

}
