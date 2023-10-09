import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringTranslationComponent } from './string-translation.component';

describe('StringTranslationComponent', () => {
  let component: StringTranslationComponent;
  let fixture: ComponentFixture<StringTranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StringTranslationComponent]
    });
    fixture = TestBed.createComponent(StringTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
