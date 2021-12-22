import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAdministrativosComponent } from './servicios-administrativos.component';

describe('ServiciosAdministrativosComponent', () => {
  let component: ServiciosAdministrativosComponent;
  let fixture: ComponentFixture<ServiciosAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosAdministrativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
