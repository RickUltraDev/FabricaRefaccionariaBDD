import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoModificarComponent } from './empleado-modificar.component';

describe('EmpleadoModificarComponent', () => {
  let component: EmpleadoModificarComponent;
  let fixture: ComponentFixture<EmpleadoModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
