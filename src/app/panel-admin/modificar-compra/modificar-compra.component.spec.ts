import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCompraComponent } from './modificar-compra.component';

describe('ModificarCompraComponent', () => {
  let component: ModificarCompraComponent;
  let fixture: ComponentFixture<ModificarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
