import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDetialsComponent } from './show-details.component';

describe('ShowDetialsComponent', () => {
  let component: ShowDetialsComponent;
  let fixture: ComponentFixture<ShowDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDetialsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Dashboard Component', () => {
    expect(component).toBeTruthy();
  });

});
