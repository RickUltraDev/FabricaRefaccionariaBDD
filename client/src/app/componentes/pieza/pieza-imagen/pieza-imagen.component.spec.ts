import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaImagenComponent } from './pieza-imagen.component';

describe('PiezaImagenComponent', () => {
  let component: PiezaImagenComponent;
  let fixture: ComponentFixture<PiezaImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezaImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezaImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
