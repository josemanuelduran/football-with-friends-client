import { fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { ToastController, Toast, ToastOptions } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { TranslateService } from '@ngx-translate/core';

import { MessagesService } from './messages.service';
import { LocalNotificationService } from '../local-notification/local-notification.service';
import { TranslateServiceStub } from '../../../../mocks';

describe('MessagesService', () => {

    let messagesService: MessagesService;
    let toastCtrl: ToastController;
    let nativeNotifications: LocalNotificationService;

    let toastOptions = {
        dismissOnPageChange: false,
        cssClass: '',
        showCloseButton: true,
        message: 'Title:\nMessage',
        closeButtonText: 'TOAST.CLOSE'
    };

    let toastOptions2 = {
        dismissOnPageChange: false,
        cssClass: '',
        showCloseButton: true,
        message: 'Message',
        closeButtonText: 'TOAST.CLOSE'
    };

    let toast: Toast = <Toast>{
        present: (): Promise<any> => undefined
    };
    let toastControllerStub = {
        create: (opts?: ToastOptions): Toast => toast
    };
    let nativeNotificationStub = {
        addNotification: (title: string, text: string): void => {}
    };
    let appVersionStub = {
        getAppName: (): Promise<any> => { return Promise.resolve('NurseAide'); }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MessagesService,
                {provide: ToastController, useValue: toastControllerStub},
                {provide: TranslateService, useValue: TranslateServiceStub},
                {provide: LocalNotificationService, useValue: nativeNotificationStub},
                {provide: AppVersion, useValue: appVersionStub}
            ]
        });
    });

    beforeEach(inject([MessagesService, ToastController], (service: MessagesService, toastService: ToastController) => {
        messagesService = service;
        toastCtrl = toastService;
    }));

    it('should create the service', () => {
        expect(messagesService).toBeTruthy();
    });

    describe('info toast', () => {

        beforeEach(() => {
            toastOptions.cssClass = 'toast-info';
            toastOptions2.cssClass = 'toast-info';
        });

        it('should show an info toast with a title, a message and a close button', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showInfo('Message', 'Title');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions);
            expect(toast.present).toHaveBeenCalled();
        });

        it('should show a info toast with a message, a close button and without a title', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showInfo('Message');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions2);
            expect(toast.present).toHaveBeenCalled();
        });

    });

    describe('success toast', () => {

        beforeEach(() => {
            toastOptions.cssClass = 'toast-success';
            toastOptions2.cssClass = 'toast-success';
        });

        it('should show a success toast with a title, a message and a close button', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showSuccess('Message', 'Title');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions);
            expect(toast.present).toHaveBeenCalled();
        });

        it('should show a success toast with a message, a close button and without a title', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showSuccess('Message');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions2);
            expect(toast.present).toHaveBeenCalled();
        });

    });

    describe('warning toast', () => {

        beforeEach(() => {
            toastOptions.cssClass = 'toast-warning';
            toastOptions2.cssClass = 'toast-warning';
        });

        it('should show a warning toast with a title, a message and a close button', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showWarning('Message', 'Title');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions);
            expect(toast.present).toHaveBeenCalled();
        });

        it('should show a warning toast with a message, a close button and without a title', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showWarning('Message');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions2);
            expect(toast.present).toHaveBeenCalled();
        });

    });

    describe('error toast', () => {

        beforeEach(() => {
            toastOptions.cssClass = 'toast-error';
            toastOptions2.cssClass = 'toast-error';
        });

        it('should show an error toast with a title, a message and a close button', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showError('Message', 'Title');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions);
            expect(toast.present).toHaveBeenCalled();
        });

        it('should show an error toast with a message, a close button and without a title', () => {
            spyOn(toastCtrl, 'create').and.callThrough();
            spyOn(toast, 'present');
            messagesService.showError('Message');
            expect(toastCtrl.create).toHaveBeenCalledWith(toastOptions2);
            expect(toast.present).toHaveBeenCalled();
        });

    });

    describe('native notification', () => {

        beforeEach(inject([LocalNotificationService], (native: LocalNotificationService) => {
            nativeNotifications = native;
        }));

        it('show a native notification with a title and a message', () => {
            spyOn(nativeNotifications, 'addNotification').and.callThrough();
            messagesService.showNativeNotification('Message', 'Title');
            expect(nativeNotifications.addNotification).toHaveBeenCalledWith('Title', 'Message');
        });

        it('show a native notification with a the app\'s name as the title and a message', fakeAsync(() => {
            spyOn(nativeNotifications, 'addNotification').and.callThrough();
            messagesService.showNativeNotification('Message');
            tick();
            expect(nativeNotifications.addNotification).toHaveBeenCalledWith('NurseAide', 'Message');
        }));

    });

});
