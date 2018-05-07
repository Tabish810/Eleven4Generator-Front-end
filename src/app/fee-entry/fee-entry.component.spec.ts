import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeEntryComponent } from './fee-entry.component';

describe('FeeEntryComponent', () => {
  let component: FeeEntryComponent;
  let fixture: ComponentFixture<FeeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
