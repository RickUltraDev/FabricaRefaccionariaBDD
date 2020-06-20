import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoBajaComponent } from './empleado-baja.component';

describe('EmpleadoBajaComponent', () => {
  let component: EmpleadoBajaComponent;
  let fixture: ComponentFixture<EmpleadoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
