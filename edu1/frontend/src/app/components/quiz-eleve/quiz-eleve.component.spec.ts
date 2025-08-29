import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEleveComponent } from './quiz-eleve.component';

describe('QuizEleveComponent', () => {
  let component: QuizEleveComponent;
  let fixture: ComponentFixture<QuizEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
