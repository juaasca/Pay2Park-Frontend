import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Info.CheckerComponent } from './info.checker.component';

describe('Info.CheckerComponent', () => {
  let component: Info.CheckerComponent;
  let fixture: ComponentFixture<Info.CheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Info.CheckerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Info.CheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
