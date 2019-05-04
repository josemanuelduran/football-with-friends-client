import { Component, OnInit } from '@angular/core';

// import { TranslateService } from '@ngx-translate/core';

import { Player } from '../../../../models';
import { PlayersService, MessagesService } from '../../../../providers';
import { NavController } from 'ionic-angular';
import { PaymentManagementPlayerComponent } from '../../../../components';

@Component({
  selector: 'fwf-payment-management-players',
  templateUrl: './payment-management-players.component.html'
})
export class PaymentManagementPlayersComponent implements OnInit {

    fixedPlayers: Player[];
    noFixedPlayers: Player[];

    constructor(
        private navCtrl: NavController,
        // private translate: TranslateService,
        private playersService: PlayersService,
        private messages: MessagesService,
    ) { }

    ngOnInit() {
        this.loadListPlayers();
    }

    loadListPlayers(): void {
        this.playersService.fetchPlayers()
            .subscribe(
                players => {
                    this.fixedPlayers = players.filter(player => player.fixed);
                    this.noFixedPlayers = players.filter(player => !player.fixed);
                },
                error => this.messages.showError(error)
            );
    }

    playerSelected(playerSelected: Player): void {
        this.navCtrl.push(
            PaymentManagementPlayerComponent,
            { player: playerSelected }
        );
    }
}
