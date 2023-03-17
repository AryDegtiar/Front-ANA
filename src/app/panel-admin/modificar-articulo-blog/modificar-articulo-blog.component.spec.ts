import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarArticuloBlogComponent } from './modificar-articulo-blog.component';

describe('ModificarArticuloBlogComponent', () => {
  let component: ModificarArticuloBlogComponent;
  let fixture: ComponentFixture<ModificarArticuloBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarArticuloBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarArticuloBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
