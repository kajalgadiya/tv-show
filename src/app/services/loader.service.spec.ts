import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created as Loader Service', () => {
    expect(service).toBeTruthy();
  });

  it('should call show to set loader value as true', () => {
    service.isLoading.subscribe((message) => {
      expect(message).toBe(true);
    });
    service.show();
  });

  it('should call hide to set loader value as false', () => {
    service.isLoading.subscribe((message) => {
      expect(message).toBe(false);
    });
    service.hide();
  });
});
