import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTariffComponent } from './edit-tariff.component';

describe('EditTariffComponent', () => {
  let component: EditTariffComponent;
  let fixture: ComponentFixture<EditTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTariffComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
