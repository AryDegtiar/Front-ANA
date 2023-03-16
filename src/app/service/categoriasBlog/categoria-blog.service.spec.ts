import { TestBed } from '@angular/core/testing';

import { CategoriaBlogService } from './categoria-blog.service';

describe('CategoriaBlogService', () => {
  let service: CategoriaBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
