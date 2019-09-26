import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkComponent } from './park.component';

describe('ParkComponent', () => {
  let component: ParkComponent;
  let fixture: ComponentFixture<ParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
