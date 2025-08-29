import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEleveComponent } from './notifications-eleve.component';

describe('NotificationsEleveComponent', () => {
  let component: NotificationsEleveComponent;
  let fixture: ComponentFixture<NotificationsEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
