import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearArticuloBlogComponent } from './crear-articulo-blog.component';

describe('CrearArticuloBlogComponent', () => {
  let component: CrearArticuloBlogComponent;
  let fixture: ComponentFixture<CrearArticuloBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearArticuloBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearArticuloBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
