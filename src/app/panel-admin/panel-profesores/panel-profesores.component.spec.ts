import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProfesoresComponent } from './panel-profesores.component';

describe('PanelProfesoresComponent', () => {
  let component: PanelProfesoresComponent;
  let fixture: ComponentFixture<PanelProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelProfesoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
