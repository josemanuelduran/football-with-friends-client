import { Injectable } from '@angular/core';
import { LoadingController, Loading, LoadingOptions } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_LOCALIZED_MESSAGE = 'BUSY_INDICATOR.PLEASE_WAIT';

@Injectable()
export class BusyIndicatorService {

    private loading: Loading;
    private isLoading: boolean;

    constructor(private loadingCtrl: LoadingController,
                private translate: TranslateService) {
    }

    public loadingAnimationStart(message?: string): void {
        if (!message) {
            message = this.translate.instant(DEFAULT_LOCALIZED_MESSAGE);
        }
        let options: LoadingOptions = {content: message};
        this.loading = this.loadingCtrl.create(options);
        this.loading.present();
        this.isLoading = true;
    }

    public loadingAnimationEnd(): void {
        if (this.loading) {
            this.loading.dismiss()
                .then(() => this.isLoading = false)
                .catch(() => {});
        }
    }

    public isBusyIndicatorVisible(): boolean {
        return this.isLoading;
    }

}
