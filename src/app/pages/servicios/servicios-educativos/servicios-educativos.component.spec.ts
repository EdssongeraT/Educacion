import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosEducativosComponent } from './servicios-educativos.component';

describe('ServiciosEducativosComponent', () => {
  let component: ServiciosEducativosComponent;
  let fixture: ComponentFixture<ServiciosEducativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosEducativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosEducativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
