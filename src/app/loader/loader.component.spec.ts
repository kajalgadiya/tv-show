import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        LoaderComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the loader component', () => {
    const fixture = TestBed.createComponent(LoaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
