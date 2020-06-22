import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaModificaComponent } from './pieza-modifica.component';

describe('PiezaModificaComponent', () => {
  let component: PiezaModificaComponent;
  let fixture: ComponentFixture<PiezaModificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezaModificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezaModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
