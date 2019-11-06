import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Create.CheckerComponent } from './create.checker.component';

describe('Create.CheckerComponent', () => {
  let component: Create.CheckerComponent;
  let fixture: ComponentFixture<Create.CheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create.CheckerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create.CheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
