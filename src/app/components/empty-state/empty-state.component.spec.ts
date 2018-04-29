/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { EmptyStateComponent } from './empty-state.component';

@Component({
    template: `
        <na-empty-state>Hello world!</na-empty-state>
        <na-empty-state image="http://dummy-image.png">Hello world with a background image!</na-empty-state>
    `
})
class EmptyStateHostComponent {
}

describe('EmptyStateComponent', () => {

    let component: EmptyStateHostComponent;
    let fixture: ComponentFixture<EmptyStateHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                EmptyStateComponent,
                EmptyStateHostComponent,
            ]
        });
    });

    describe('with no background image', () => {
        beforeEach(() => {
            fixture = TestBed
                .overrideComponent(EmptyStateHostComponent, {
                    set: {
                        template: '<na-empty-state>Hello world!</na-empty-state>'
                    }
                })
                .createComponent(EmptyStateHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should NOT render a background image', () => {
            const img: DebugElement = fixture.debugElement.query(By.css('img'));
            expect(img).toBeNull();
        });

        it('should render a custom message', () => {
            const el: HTMLElement = fixture.debugElement.query(By.css('ion-card-content')).nativeElement;
            expect(el.innerText).toBe('Hello world!');
        });
    });

    describe('with a background image', () => {

        beforeEach(() => {
            fixture = TestBed
                .overrideComponent(EmptyStateHostComponent, {
                    set: {
                        template: `
                            <na-empty-state image="http://dummy-image.png">
                                Hello world with a background image!
                            </na-empty-state>
                        `
                    }
                })
                .createComponent(EmptyStateHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render a background image', () => {
            const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
            expect(img.src).toBe('http://dummy-image.png/');
        });

        it('should render a custom message', () => {
            const el: HTMLElement = fixture.debugElement.query(By.css('ion-card-content')).nativeElement;
            expect(el.innerText).toBe('Hello world with a background image!');
        });
    });

});
