import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaRegistradosComponent } from './pieza-registrados.component';

describe('PiezaRegistradosComponent', () => {
  let component: PiezaRegistradosComponent;
  let fixture: ComponentFixture<PiezaRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezaRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezaRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
