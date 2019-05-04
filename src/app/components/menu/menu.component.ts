import { Component, Output, EventEmitter, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuController, Content } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { ContextService } from '../../providers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fwf-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

    @Input() content: Content;

    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

    tiles1: any[];
    tiles2: any[];
    private authSubscription: Subscription;

    constructor(
        private menu: MenuController,
        private translate: TranslateService,
        private context: ContextService,
    ) { }

    ngOnInit(): void {
        this.authSubscription = this.context.readyRoles$.subscribe(
            ready => {
                if (ready) {
                    if (this.context.userLoggedIsAdmin() || this.context.userLoggedIsTreasurer()) {
                        if (!this.tiles1.find(tile => tile.title === 'MENU.PAYMENT_MANAGEMENT')) {
                            this.tiles1.push({
                                title: 'MENU.PAYMENT_MANAGEMENT',
                                target: 'tiles.payment_management',
                                icon: 'cash'
                            });
                        }
                    } else {
                        _.remove(this.tiles2, function(tile) {
                            return tile.title === 'MENU.PAYMENT_MANAGEMENT';
                        });
                    }
                }
            }
        );
        this.initializeTiles();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    navigateTo(target): void {
        this.menuItemSelected(target);
    }

    getImageSource(): string {
        return this.translate.instant('APPLICATION_DETAIL.IMAGE_SOURCE');
    }

    private menuItemSelected(item: string) {
        this.itemSelected.emit(item);
        this.menu.close();
    }

    private initializeTiles() {
        this.tiles1 = [
            {
                title: 'MENU.MATCHES',
                target: 'tiles.matches',
                icon: 'football'
            },
            {
                title: 'MENU.PROFILE',
                target: 'tiles.profile',
                icon: 'person'
            },
            {
                title: 'MENU.PAYMENTS',
                target: 'tiles.payments',
                icon: 'cash'
            },
            {
                title: 'MENU.STATS',
                target: 'tiles.stats',
                icon: 'stats'
            }
        ];
        this.tiles2 = [
            {
                title: 'MENU.INTRODUCTION',
                target: 'tiles.introduction',
                icon: 'information-circle'
            },
            {
                title: 'MENU.ABOUT',
                target: 'tiles.about',
                icon: 'ribbon'
            },
            {
                title: 'MENU.LOGOUT',
                target: 'tiles.logout',
                icon: 'log-out'
            }
        ];
    }

}
