import { Component, ViewChild } from '@angular/core';
import { MenuController, Slides, IonicPage, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
    name: 'IntroductionPage',
    segment: 'introduction'
})
@Component({
  selector: 'fwf-page-introduction',
  templateUrl: 'introduction.component.html'
})

export class IntroductionPageComponent {

    showSkip = true;
    image1 = 'assets/img/png/Cup.png';
    image2 = 'assets/img/png/Kick.png';
    image3 = 'assets/img/png/Goal.png';
    image4 = 'assets/img/png/Foul.png';

    @ViewChild('slides') slides: Slides;

    constructor(
        private app: App,
        private menu: MenuController,
        private storage: Storage
    ) { }

    startApp() {
        this.app.getActiveNavs()[0].setRoot('LoginPage').then(() => {
            this.storage.set('hasSeenTutorial', 'true');
        });
    }

    onSlideChangeStart(slider: Slides) {
        this.showSkip = !slider.isEnd();
    }

    ionViewWillEnter() {
        this.slides.update();
    }

    ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    ionViewDidLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }

}
