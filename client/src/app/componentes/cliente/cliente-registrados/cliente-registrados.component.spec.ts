import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRegistradosComponent } from './cliente-registrados.component';

describe('ClienteRegistradosComponent', () => {
  let component: ClienteRegistradosComponent;
  let fixture: ComponentFixture<ClienteRegistradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteRegistradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
