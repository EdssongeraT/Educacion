import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPlataformaComponent } from './principal-plataforma.component';

describe('PrincipalPlataformaComponent', () => {
  let component: PrincipalPlataformaComponent;
  let fixture: ComponentFixture<PrincipalPlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalPlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
