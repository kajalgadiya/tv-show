import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [DashboardService]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    fixture.detectChanges();
  });

  it('should create Header component', () => {
    expect(component).toBeTruthy();
  });

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' }, keyCode: 34 };
    fixture.componentInstance.valueSearched(event);
    expect(fixture.componentInstance.searchedTerm).toEqual('Thrones');
  });

  it('should show hide top button on window scroll on each page', () => {
    component.scrollPosition = 0;
    component.topPositionToShowScrollBtn = 150;
    window.dispatchEvent(new Event('scroll'));
    expect(component.showScrollTopBtn).toEqual(false);
  });

  it('should contian collapsed as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerId = document.getElementById('navbarTogglerId');
    const navToggelerClassList = navToggerId.classList;
    expect(navToggelerClassList).toContain('collapsed');
    expect(navToggelerClassList).not.toContain('collapse');
  });

  it('should contian collapse as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerCollapseId = document.getElementById('navbarTogglerId');
    const navToggelerClassList1 = navToggerCollapseId.classList;
    navToggelerClassList1.add('collapse');
    navToggelerClassList1.remove('collapsed');
    expect(navToggelerClassList1).toContain('collapse');
    expect(navToggelerClassList1).not.toContain('collapsed');
  });

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' }, keyCode: 13 };
    fixture.componentInstance.valueSearched(event);
    expect(fixture.componentInstance.searchedTerm).toEqual('Thrones');
  });

  it('should call empty search term to set searched value as blank', () => {
    component.searchedTerm = 'The Wire';
    component.emptySearchedTerm();
    expect(component.searchedTerm.trim()).toEqual('');
  });
});
