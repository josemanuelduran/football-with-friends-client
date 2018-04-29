import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { MatchesService } from '../../providers';
import { Match } from '../../models';

@Component({
  selector: 'fwf-add-match',
  templateUrl: 'add-match.component.html'
})
export class AddMatchComponent implements OnInit {

    matchForm: FormGroup;
    match: Match;

    constructor(
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private matchesService: MatchesService,
        private navParams: NavParams
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
        if (this.match) {
            this.matchForm = this.formBuilder.group({
                name: [this.match.name, Validators.required],
                date: [this.match.date.toISOString(), Validators.required],
                numPlayers: [this.match.numPlayers, Validators.required],
                openCallUp: [this.match.openCallUp],
                cancelled: [this.match.cancelled]
            });
        } else {
            this.matchForm = this.formBuilder.group({
                name: ['', Validators.required],
                date: ['', Validators.required],
                numPlayers: [14, Validators.required],
                openCallUp: [false],
                cancelled: [false]
            });
        }
    }

    saveMatch() {
        if (this.match) {
            this.match = {
                ...this.match,
                name: this.matchForm.controls['name'].value,
                date: this.matchForm.controls['date'].value,
                numPlayers: this.matchForm.controls['numPlayers'].value,
                openCallUp: this.matchForm.controls['openCallUp'].value,
                cancelled: this.matchForm.controls['cancelled'].value
            };
            this.matchesService.updateMatch(this.match)
                .subscribe(
                    data => this.viewCtrl.dismiss(true),
                    error => this.showError(error)
                );
        } else {
            let match: Match = {
                name: this.matchForm.controls['name'].value,
                date: this.matchForm.controls['date'].value,
                numPlayers: this.matchForm.controls['numPlayers'].value,
                openCallUp: this.matchForm.controls['openCallUp'].value,
                cancelled: false
            };
            this.matchesService.createMatch(match).subscribe(
                data => this.viewCtrl.dismiss(true),
                error => this.showError(error)
            );
        }
    }

    cancel(): void {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('ADDMATCHPAGE.CANCEL'),
            subTitle: this.translate.instant('ADDMATCHPAGE.SURE'),
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'ok',
                    handler: data => {
                        this.viewCtrl.dismiss(false);
                    }
                },
            ]
          });
          alert.present();
    }

    private showError(error: any) {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ADDMATCHPAGE.ERROR'),
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
    }

}
