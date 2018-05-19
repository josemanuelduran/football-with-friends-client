import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

export enum ToastType {
    Info = 1,
    Success,
    Warning,
    Error
}

export interface ToastMessage {
    type?: ToastType;
    title?: string;
    text?: string;
    autoClose?: boolean;
}

@Injectable()
export class MessagesService {

    constructor(private toastCtrl: ToastController,
                private translate: TranslateService) {
    }

    public showInfo(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Info, message, title);
    }

    public showSuccess(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Success, message, title);
    }

    public showWarning(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Warning, message, title);
    }

    public showError(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Error, message, title);
    }

    private createMessage(message: string, title?: string): string {
        let result = '';

        if (title != null) {
            result += this.translate.instant(title);
        }

        if (title != null && message != null) {
            result += ':\n';
        }

        if (message != null) {
            result += this.translate.instant(message);
        }

        return result;
    }

    private show(type: ToastType, message: string | ToastMessage, title?: string): void {
        let toastOptions: ToastOptions = {
            dismissOnPageChange: false,
            cssClass: this.getCssClass(type),
            // position: 'bottom'
            showCloseButton: true,
            closeButtonText: this.translate.instant('TOAST.CLOSE')
        };
        if (typeof message === 'string') {
            toastOptions.message = this.createMessage(message, title);
            if (type === ToastType.Info || type === ToastType.Success) {
                toastOptions.duration = 2500;
            }
        } else {
            toastOptions.message = this.createMessage(message.text, message.title);
            if (message.autoClose) {
                toastOptions.duration = 2500;
            }
        }
        let toast = this.toastCtrl.create(toastOptions);
        toast.present();
    }

    private getCssClass(type: ToastType): string {
        let cssClass = '';
        switch (type) {
            case ToastType.Info:
                cssClass = 'toast-info';
                break;
            case ToastType.Success:
                cssClass = 'toast-success';
                break;
            case ToastType.Warning:
                cssClass = 'toast-warning';
                break;
            case ToastType.Error:
                cssClass = 'toast-error';
                break;
            default:
                cssClass = 'toast-info';
        }
        return cssClass;
    }

}
