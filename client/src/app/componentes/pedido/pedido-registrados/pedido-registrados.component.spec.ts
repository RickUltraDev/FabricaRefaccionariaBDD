import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegistradosComponent } from './pedido-registrados.component';

describe('PedidoRegistradosComponent', () => {
  let component: PedidoRegistradosComponent;
  let fixture: ComponentFixture<PedidoRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
