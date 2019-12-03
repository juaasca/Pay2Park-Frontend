import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDenunciasComponent } from './historial-denuncias.component';

describe('HistorialDenunciasComponent', () => {
  let component: HistorialDenunciasComponent;
  let fixture: ComponentFixture<HistorialDenunciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDenunciasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creado coorectamente', () => {
    expect(component).toBeTruthy();
  });
});
