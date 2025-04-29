import { TestBed } from '@angular/core/testing';

import { WordleAppService } from './wordle-app.service';

describe('WordleAppService', () => {
  let service: WordleAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordleAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
