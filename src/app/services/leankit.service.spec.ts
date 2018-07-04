import { TestBed, inject } from '@angular/core/testing';

import { LeankitService } from './leankit.service';

describe('LeankitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeankitService]
    });
  });

  it('should be created', inject([LeankitService], (service: LeankitService) => {
    expect(service).toBeTruthy();
  }));
});
