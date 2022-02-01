import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { Player } from '../../../../models';
import { PlayersService, MessagesService } from '../../../../providers';
import { PaymentManagementPlayerComponent } from '../../../../components';
import { AddPaymentsComponent } from '../../../../components/payments-management/add-payments/add-payments.component';

@Component({
  selector: 'fwf-payment-management-players',
  templateUrl: './payment-management-players.component.html'
})
export class PaymentManagementPlayersComponent implements OnInit {

    fixedPlayers: Player[];
    noFixedPlayers: Player[];

    constructor(
        private navCtrl: NavController,
        private playersService: PlayersService,
        private messages: MessagesService,
        private modalCtrl: ModalController,
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

    addPayments() {
        let dialog = this.modalCtrl.create(AddPaymentsComponent, {fixedPlayerList: this.fixedPlayers}, {enableBackdropDismiss: false});
          dialog.onDidDismiss((actionOk: boolean) => {});
          dialog.present();
    }
}
