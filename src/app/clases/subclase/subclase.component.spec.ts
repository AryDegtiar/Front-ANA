import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclaseComponent } from './subclase.component';

describe('SubclaseComponent', () => {
  let component: SubclaseComponent;
  let fixture: ComponentFixture<SubclaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubclaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
