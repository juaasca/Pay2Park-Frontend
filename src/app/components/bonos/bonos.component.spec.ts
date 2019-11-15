import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonosComponent } from './bonos.component';

describe('BonosComponent', () => {
  let component: BonosComponent;
  let fixture: ComponentFixture<BonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
