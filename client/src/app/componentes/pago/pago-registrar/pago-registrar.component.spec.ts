import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRegistrarComponent } from './pago-registrar.component';

describe('PagoRegistrarComponent', () => {
  let component: PagoRegistrarComponent;
  let fixture: ComponentFixture<PagoRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
