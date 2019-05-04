import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementPlayerComponent } from './payment-management-player.component';

describe('PaymentManagementPlayerComponent', () => {
  let component: PaymentManagementPlayerComponent;
  let fixture: ComponentFixture<PaymentManagementPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentManagementPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
