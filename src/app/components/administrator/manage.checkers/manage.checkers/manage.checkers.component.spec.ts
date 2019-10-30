import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Manage.CheckersComponent } from './manage.checkers.component';

describe('Manage.CheckersComponent', () => {
  let component: Manage.CheckersComponent;
  let fixture: ComponentFixture<Manage.CheckersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Manage.CheckersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Manage.CheckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
