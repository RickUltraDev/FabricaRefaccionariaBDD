import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRegistrarComponent } from './cliente-registrar.component';

describe('ClienteRegistrarComponent', () => {
  let component: ClienteRegistrarComponent;
  let fixture: ComponentFixture<ClienteRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
