import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperBankComponent } from './super-bank.component';

describe('SuperBankComponent', () => {
  let component: SuperBankComponent;
  let fixture: ComponentFixture<SuperBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
