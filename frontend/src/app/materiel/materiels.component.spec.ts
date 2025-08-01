import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielComponent } from './materiels.component';

describe('MaterielsComponent', () => {
  let component: MaterielComponent;
  let fixture: ComponentFixture<MaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
