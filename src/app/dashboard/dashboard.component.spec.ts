import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [DashboardService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    fixture.detectChanges();
  });

  it('should create Dashboard Component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTvShowsInformation and return list of tvShowsList', fakeAsync(() => {
    const response: any =
      [{
        "id": 1,
        "url": "http://www.tvmaze.com/shows/1/under-the-dome",
        "name": "Under the Dome",
        "type": "Scripted",
        "language": "English",
        "genres": [
          "Drama",
          "Science-Fiction",
          "Thriller"
        ],
        "status": "Ended",
        "runtime": 60,
        "premiered": "2013-06-24",
        "officialSite": "http://www.cbs.com/shows/under-the-dome/",
        "schedule": {
          "time": "22:00",
          "days": [
            "Thursday"
          ]
        },
        "rating": {
          "average": 6.5
        },
        "weight": 97,
        "network": {
          "id": 2,
          "name": "CBS",
          "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
          }
        },
        "webChannel": null,
        "externals": {
          "tvrage": 25988,
          "thetvdb": 264492,
          "imdb": "tt1553656"
        },
        "image": {
          "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
          "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
        },
        "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
        "updated": 1573667713,
        "_links": {
          "self": {
            "href": "http://api.tvmaze.com/shows/1"
          },
          "previousepisode": {
            "href": "http://api.tvmaze.com/episodes/185054"
          }
        }
      }]
    spyOn(dashboardService, 'getTvShowsInformation').and.returnValue(of(response));
    component.getTvShowsData();
    expect(component.tvShowsList).toEqual(response);
  }));

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' } };
    fixture.componentInstance.searchShows(event);
    expect(fixture.componentInstance.searchedTerm).toEqual('Thrones');
  });

  it('should get searched results from the searched value', () => {
    component.searchedTerm = '';
    component.triggerSearch();
    expect(component.isSearched).toEqual(false);
    expect(component.loadData).toEqual(true);
  });


  // it('should get searched results from the searched value', () => {
  //   component.searchedTerm = 'Thrones';
  //   component.triggerSearch();
  //   const response1 = []
  //   spyOn(dashboardService, 'searchTvShows').withArgs(component.searchedTerm).and.returnValue(of(response1));
  //   expect(component.isSearched).toEqual(true);
  //   expect(component.loadData).toEqual(true);
  // });

  // it('should call showDetails based on selected show id', fakeAsync(() => {
  //   let showId = 10;
  //   component.showDetails(showId);
  // }));
});
