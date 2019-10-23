import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModal } from './result.component';

describe('ResultComponent', () => {
  let component: ResultModal;
  let fixture: ComponentFixture<ResultModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
