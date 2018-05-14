import { TestBed, inject } from '@angular/core/testing';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BusyIndicatorService } from './busy-indicator.service';
import { TranslateServiceStub } from '../../../../mocks';

describe('BusyIndicatorService', () => {

    let busyIndicatorService: BusyIndicatorService;
    let loadingController: LoadingController;
    let translateService: TranslateService;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                BusyIndicatorService,
                {provide: LoadingController, useValue: {}},
                {provide: TranslateService, useValue: TranslateServiceStub},
            ]
        });
    });

    beforeEach(inject([BusyIndicatorService, LoadingController, TranslateService],
        (service: BusyIndicatorService, loadingCtrl: LoadingController, translate: TranslateService) => {
            busyIndicatorService = service;
            loadingController = loadingCtrl;
            translateService = translate;
    }));

    it('should create the service', () => {
        // Assert
        expect(busyIndicatorService).toBeTruthy();
    });

});
