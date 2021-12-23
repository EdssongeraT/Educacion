import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosInstitucionalesComponent } from './servicios-institucionales.component';

describe('ServiciosInstitucionalesComponent', () => {
  let component: ServiciosInstitucionalesComponent;
  let fixture: ComponentFixture<ServiciosInstitucionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosInstitucionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosInstitucionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
