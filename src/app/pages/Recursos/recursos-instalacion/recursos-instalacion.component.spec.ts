import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosInstalacionComponent } from './recursos-instalacion.component';

describe('RecursosInstalacionComponent', () => {
  let component: RecursosInstalacionComponent;
  let fixture: ComponentFixture<RecursosInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosInstalacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
