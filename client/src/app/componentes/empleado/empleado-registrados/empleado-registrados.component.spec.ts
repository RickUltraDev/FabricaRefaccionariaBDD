import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegistradosComponent } from './empleado-registrados.component';

describe('EmpleadoRegistradosComponent', () => {
  let component: EmpleadoRegistradosComponent;
  let fixture: ComponentFixture<EmpleadoRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
