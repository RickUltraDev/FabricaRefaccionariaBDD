import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaRegistradosComponent } from './factura-registrados.component';

describe('FacturaRegistradosComponent', () => {
  let component: FacturaRegistradosComponent;
  let fixture: ComponentFixture<FacturaRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
