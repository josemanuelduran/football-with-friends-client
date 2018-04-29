import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Injectable()
export class GlobalService {

    private appVersion = 'v1.0';

    constructor(
        private menu: MenuController,
    ) { }

    getVersion(): string {
        return this.appVersion;
    }

    enableSideMenu(enable: boolean): void {
        this.menu.enable(enable);
    }
}
