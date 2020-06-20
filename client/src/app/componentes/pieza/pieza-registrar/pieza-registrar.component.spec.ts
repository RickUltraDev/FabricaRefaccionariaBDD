import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaRegistrarComponent } from './pieza-registrar.component';

describe('PiezaRegistrarComponent', () => {
  let component: PiezaRegistrarComponent;
  let fixture: ComponentFixture<PiezaRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezaRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
