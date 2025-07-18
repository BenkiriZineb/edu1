import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtileComponent } from './utile.component';

describe('UtileComponent', () => {
  let component: UtileComponent;
  let fixture: ComponentFixture<UtileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
