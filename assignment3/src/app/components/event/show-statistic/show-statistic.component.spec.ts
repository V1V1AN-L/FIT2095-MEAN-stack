import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStatisticComponent } from './show-statistic.component';

describe('ShowStatisticComponent', () => {
  let component: ShowStatisticComponent;
  let fixture: ComponentFixture<ShowStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStatisticComponent]
    });
    fixture = TestBed.createComponent(ShowStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
