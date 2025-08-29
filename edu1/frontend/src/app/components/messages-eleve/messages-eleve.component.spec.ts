import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesEleveComponent } from './messages-eleve.component';

describe('MessagesEleveComponent', () => {
  let component: MessagesEleveComponent;
  let fixture: ComponentFixture<MessagesEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
