import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoModificarComponent } from './pago-modificar.component';

describe('PagoModificarComponent', () => {
  let component: PagoModificarComponent;
  let fixture: ComponentFixture<PagoModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
