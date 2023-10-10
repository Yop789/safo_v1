import { TestBed } from '@angular/core/testing';

import { TituloAppService } from './titulo-app.service';

describe('TituloAppService', () => {
  let service: TituloAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TituloAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
