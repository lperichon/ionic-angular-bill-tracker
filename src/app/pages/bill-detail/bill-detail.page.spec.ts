import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailPage } from './bill-detail.page';

describe('BillDetailPage', () => {
  let component: BillDetailPage;
  let fixture: ComponentFixture<BillDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
