import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClasesComponent } from './panel-clases.component';

describe('PanelClasesComponent', () => {
  let component: PanelClasesComponent;
  let fixture: ComponentFixture<PanelClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelClasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
