import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DashboardService
      ]
    });
    service = TestBed.inject(DashboardService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created as Dashboard Service File', () => {
    expect(service).toBeTruthy();
  });

  it('should call setSearchedValue to set searchedKey value', () => {
    service.searchedKey.subscribe((message) => {
      expect(message).toBe('Thrones');
    });
    service.setSearchedValue('Thrones');
  });

});
