import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Create.PersonComponent } from './create.person.component';

describe('Create.PersonComponent', () => {
  let component: Create.PersonComponent;
  let fixture: ComponentFixture<Create.PersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create.PersonComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create.PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
