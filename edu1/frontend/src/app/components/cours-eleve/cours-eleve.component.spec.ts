import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEleveComponent } from './cours-eleve.component';

describe('CoursEleveComponent', () => {
  let component: CoursEleveComponent;
  let fixture: ComponentFixture<CoursEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
