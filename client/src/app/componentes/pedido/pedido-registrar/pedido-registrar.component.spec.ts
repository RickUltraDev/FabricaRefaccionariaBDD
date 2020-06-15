import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegistrarComponent } from './pedido-registrar.component';

describe('PedidoRegistrarComponent', () => {
  let component: PedidoRegistrarComponent;
  let fixture: ComponentFixture<PedidoRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
