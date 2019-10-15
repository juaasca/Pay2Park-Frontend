import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientComponent } from './info-client.component';

describe('InfoClientComponent', () => {
  let component: InfoClientComponent;
  let fixture: ComponentFixture<InfoClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoClientComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
