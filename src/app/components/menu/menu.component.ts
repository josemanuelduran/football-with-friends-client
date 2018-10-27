import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuController, Content } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fwf-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {

    @Input() content: Content;

    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

    tiles1: any[];
    tiles2: any[];

    constructor(
        private menu: MenuController,
        private translate: TranslateService,
    ) { }

    ngOnInit(): void {
        this.initializeTiles();
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
            // {
            //     title: 'MENU.SETTINGS',
            //     target: 'tiles.settings',
            //     icon: 'settings'
            // },
            // {
            //     title: 'MENU.LOCATION',
            //     target: 'tiles.location',
            //     icon: 'pin'
            // },
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
            },
        ];
    }

}
