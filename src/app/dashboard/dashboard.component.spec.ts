import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

  it('should call searchedResults and return list of searchedTermTvShows', fakeAsync(() => {
    component.searchedTerm = 'Got';
    component.triggerSearch();
    const searchedResults = [
      {
        "score": 12.24291,
        "show": {
          "id": 6187,
          "url": "http://www.tvmaze.com/shows/6187/arabs-got-talent",
          "name": "Arabs Got Talent",
          "type": "Reality",
          "language": "Arabic",
          "genres": [],
          "status": "Running",
          "runtime": 60,
          "premiered": "2011-01-15",
          "officialSite": "http://www.mbc.net/ar/programs/arabs-got-talent-s3.html",
          "schedule": {
            "time": "20:00",
            "days": [
              "Saturday"
            ]
          },
          "rating": {
            "average": null
          },
          "weight": 0,
          "network": {
            "id": 425,
            "name": "MBC 4",
            "country": {
              "name": "United Arab Emirates",
              "code": "AE",
              "timezone": "Asia/Dubai"
            }
          },
          "webChannel": null,
          "externals": {
            "tvrage": null,
            "thetvdb": 258122,
            "imdb": null
          },
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/23/59765.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/23/59765.jpg"
          },
          "summary": "",
          "updated": 1574388907,
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/shows/6187"
            },
            "previousepisode": {
              "href": "http://api.tvmaze.com/episodes/1695749"
            }
          }
        }
      }
    ]
    spyOn(dashboardService, 'searchTvShows').withArgs(component.searchedTerm).and.returnValue(of(searchedResults));
    component.searchedResults();
    expect(component.searchedTermTvShows).toEqual(searchedResults);
    expect(component.isSearched).toEqual(true);
    expect(component.loadData).toEqual(true);
  }));

  it('sorts average rating in descending order', function () {
    let data = [{ rating: { average: 2 } }, { rating: { average: 9 } }, { rating: { average: 5 } }, { rating: { average: 8 } }];
    component.descendingRatingAverage(data);
    let sortedOutput = [{ rating: { average: 9 } }, { rating: { average: 8 } }, { rating: { average: 5 } }, { rating: { average: 2 } }];
    expect(data).toEqual(sortedOutput);
  });

  it('should call getSearchedValue to fetch latest searched Value', fakeAsync(() => {
    component.ngOnInit();
    let searchedData = 'Thrones';
    component.searchedTerm = 'Thrones';
    spyOn(dashboardService, 'getSearchedValue').and.returnValue(of(searchedData));
    component.triggerSearch();
    expect(component.searchedTerm).toEqual(searchedData);
  }));

  it('should get load page without any search results', fakeAsync(() => {
    component.searchedTerm = '';
    component.triggerSearch();
    tick(500);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isSearched).toEqual(false);
      expect(component.loadData).toBe(true);
    })
  }));
});
