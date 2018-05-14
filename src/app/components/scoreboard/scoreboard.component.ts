import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'fwf-scoreboard',
    templateUrl: './scoreboard.component.html'
})
export class ScoreboardComponent implements OnInit {

    scoreWhite: number;
    scoreBlack: number;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams
    ) { }

    ngOnInit() {
        this.scoreBlack = this.navParams.get('scoreBlack');
        this.scoreWhite = this.navParams.get('scoreWhite');
    }

    addWhite(): void {
        this.scoreWhite++;
    }

    subWhite(): void {
        if (this.scoreWhite > 0) {
            this.scoreWhite--;
        }
    }

    addBlack(): void {
        this.scoreBlack++;
    }

    subBlack(): void {
        if (this.scoreBlack > 0) {
            this.scoreBlack--;
        }
    }

    save(): void {
        this.viewCtrl.dismiss({ actionOk: true, scoreWhite: this.scoreWhite, scoreBlack: this.scoreBlack});
    }

    cancel(): void {
        this.viewCtrl.dismiss({ actionOk: false });
    }

}
