import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementPageComponent } from './payment-management.component';

describe('PaymentManagementComponent', () => {
  let component: PaymentManagementPageComponent;
  let fixture: ComponentFixture<PaymentManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
