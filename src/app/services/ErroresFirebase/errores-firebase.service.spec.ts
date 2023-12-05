import { TestBed } from '@angular/core/testing';

import { ErroresFirebaseService } from './errores-firebase.service';

describe('ErroresFirebaseService', () => {
  let service: ErroresFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroresFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
