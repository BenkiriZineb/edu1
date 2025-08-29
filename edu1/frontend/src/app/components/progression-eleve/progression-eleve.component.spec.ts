import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionEleveComponent } from './progression-eleve.component';

describe('ProgressionEleveComponent', () => {
  let component: ProgressionEleveComponent;
  let fixture: ComponentFixture<ProgressionEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressionEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
