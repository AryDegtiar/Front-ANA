import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelArticulosBlogComponent } from './panel-articulos-blog.component';

describe('PanelArticulosBlogComponent', () => {
  let component: PanelArticulosBlogComponent;
  let fixture: ComponentFixture<PanelArticulosBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelArticulosBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelArticulosBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
