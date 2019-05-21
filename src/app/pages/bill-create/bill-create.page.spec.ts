import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCreatePage } from './bill-create.page';

describe('BillCreatePage', () => {
  let component: BillCreatePage;
  let fixture: ComponentFixture<BillCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
