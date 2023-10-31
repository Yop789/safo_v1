import { TestBed } from '@angular/core/testing';

import { OpMenusService } from './op-menus.service';

describe('OpMenusService', () => {
  let service: OpMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
