import { TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';

import { ContextService } from './context.service';

describe('ContextService', () => {

    let contextService: ContextService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContextService,
                {provide: Platform, useValue: {}},
            ]
        });
    });

    beforeEach(inject([ContextService], (service: ContextService) => {
        contextService = service;
    }));

    it('should create the service', () => {
        expect(contextService).toBeTruthy();
    });

});
