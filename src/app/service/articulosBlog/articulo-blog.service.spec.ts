import { TestBed } from '@angular/core/testing';

import { ArticuloBlogService } from './articulo-blog.service';

describe('ArticuloBlogService', () => {
  let service: ArticuloBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
