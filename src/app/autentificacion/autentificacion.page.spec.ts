import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentificacionPage } from './autentificacion.page';

describe('AutentificacionPage', () => {
  let component: AutentificacionPage;
  let fixture: ComponentFixture<AutentificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutentificacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutentificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
