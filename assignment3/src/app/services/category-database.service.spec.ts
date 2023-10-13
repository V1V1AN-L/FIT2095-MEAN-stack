import { TestBed } from '@angular/core/testing';

import { CategoryDatabaseService } from './category-database.service';

describe('CategoryDatabaseService', () => {
  let service: CategoryDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
