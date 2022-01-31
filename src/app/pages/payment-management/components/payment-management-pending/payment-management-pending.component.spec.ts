import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementPendingComponent } from './payment-management-pending.component';

describe('PaymentManagementPlayersComponent', () => {
  let component: PaymentManagementPendingComponent;
  let fixture: ComponentFixture<PaymentManagementPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentManagementPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
