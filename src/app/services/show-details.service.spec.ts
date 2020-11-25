import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ShowDetailsService } from './show-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ShowDetailsService', () => {
  let service: ShowDetailsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShowDetailsService
      ]
    });
    service = TestBed.inject(ShowDetailsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created as Show Details Service File', () => {
    expect(service).toBeTruthy();
  });

});
