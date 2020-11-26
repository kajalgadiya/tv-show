import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../services/dashboard.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dashboardService: DashboardService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dashboardService = TestBed.inject(DashboardService);

  });

  it('should create Header component', () => {
    expect(component).toBeTruthy();
  });

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' } };
    fixture.componentInstance.valueSearched(event);
    expect(fixture.componentInstance.searchedTerm).toEqual('Thrones');
  });

  it('should set searched TV Show Value as Blank when setSearchValue is called', () => {
    component.searchedTerm = '';
    fixture.componentInstance.setSearchValue();
    expect(fixture.componentInstance.searchedTerm).toEqual('');
  });

  it('should show hide top button on window scroll on each page', () => {
    component.scrollPosition = 0;
    component.topPosToStartShowing = 150;
    window.dispatchEvent(new Event('scroll'));
    expect(component.isShow).toEqual(false);
  });

  it('should contian collapsed as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerId = document.getElementById("navbarTogglerId");
    const navToggelerClassList = navToggerId.classList;
    expect(navToggelerClassList).toContain('collapsed');
    expect(navToggelerClassList).not.toContain('collapse');
  });

  it('should contian collapse as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerCollapseId = document.getElementById("navbarTogglerId");
    const navToggelerClassList1 = navToggerCollapseId.classList;
    navToggelerClassList1.add("collapse");
    navToggelerClassList1.remove("collapsed");
    expect(navToggelerClassList1).toContain('collapse');
    expect(navToggelerClassList1).not.toContain('collapsed');
  });
});
