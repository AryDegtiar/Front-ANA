import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGeneralComponent } from './clases-general.component';

describe('ClasesGeneralComponent', () => {
  let component: ClasesGeneralComponent;
  let fixture: ComponentFixture<ClasesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
