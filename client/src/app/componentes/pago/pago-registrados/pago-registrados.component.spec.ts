import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRegistradosComponent } from './pago-registrados.component';

describe('PagoRegistradosComponent', () => {
  let component: PagoRegistradosComponent;
  let fixture: ComponentFixture<PagoRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
