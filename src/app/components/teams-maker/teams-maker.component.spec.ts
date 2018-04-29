import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMakerComponent } from './teams-maker.component';

describe('TeamsMakerComponent', () => {
  let component: TeamsMakerComponent;
  let fixture: ComponentFixture<TeamsMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
