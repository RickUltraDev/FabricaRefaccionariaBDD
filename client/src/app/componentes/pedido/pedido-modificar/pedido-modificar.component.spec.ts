import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoModificarComponent } from './pedido-modificar.component';

describe('PedidoModificarComponent', () => {
  let component: PedidoModificarComponent;
  let fixture: ComponentFixture<PedidoModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
