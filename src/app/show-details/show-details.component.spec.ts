import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailsService } from '../services/show-details.service';
import { ShowDetialsComponent } from './show-details.component';
import { of } from 'rxjs';

describe('ShowDetialsComponent', () => {
  let component: ShowDetialsComponent;
  let fixture: ComponentFixture<ShowDetialsComponent>;
  let showDetailsService: ShowDetailsService;

  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: 'showId'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDetialsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ShowDetailsService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetialsComponent);
    component = fixture.componentInstance;
    showDetailsService = TestBed.inject(ShowDetailsService);
    fixture.detectChanges();
  });

  it('should create Show Detials Component', () => {
    expect(component).toBeTruthy();
  });


  it('should call getTvShowsInformation and return list of showDetailsData', fakeAsync(() => {
    component.selectedShowId = 1;
    const response: any =
    {
      "id": 180, "url": "http://www.tvmaze.com/shows/180/firefly", "name": "Firefly",
      "type": "Scripted", "language": "English", "genres": ["Drama", "Adventure", "Science-Fiction"],
      "status": "Ended", "runtime": 60, "premiered": "2002-09-20", "officialSite": null,
      "schedule": { "time": "20:00", "days": ["Friday"] }, "rating": { "average": 9.2 },
      "weight": 92, "network": {
        "id": 4, "name": "FOX",
        "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }
      },
      "webChannel": null, "externals": { "tvrage": 3548, "thetvdb": 78874, "imdb": "tt0303461" },
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2600.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2600.jpg"
      },
      "summary": "<p>Five hundred years in the future, a renegade crew aboard a small spacecraft tries to survive as they travel the unknown parts of the galaxy and evade warring factions as well as authority agents out to get them.</p>", "updated": 1591835730, "_links": { "self": { "href": "http://api.tvmaze.com/shows/180" }, "previousepisode": { "href": "http://api.tvmaze.com/episodes/13005" } }, "_embedded": { "cast": [{ "person": { "id": 9135, "url": "http://www.tvmaze.com/people/9135/nathan-fillion", "name": "Nathan Fillion", "country": { "name": "Canada", "code": "CA", "timezone": "America/Halifax" }, "birthday": "1971-03-27", "deathday": null, "gender": "Male", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/248/620269.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/248/620269.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/9135" } } }, "character": { "id": 49339, "url": "http://www.tvmaze.com/characters/49339/firefly-captain-malcolm-mal-reynolds", "name": "Captain Malcolm \"Mal\" Reynolds", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2601.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2601.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49339" } } }, "self": false, "voice": false }, { "person": { "id": 12877, "url": "http://www.tvmaze.com/people/12877/gina-torres", "name": "Gina Torres", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1969-04-25", "deathday": null, "gender": "Female", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/190/475439.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/190/475439.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/12877" } } }, "character": { "id": 49340, "url": "http://www.tvmaze.com/characters/49340/firefly-zoe-alleyne-washburne", "name": "Zoe Alleyne Washburne", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2604.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2604.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49340" } } }, "self": false, "voice": false }, { "person": { "id": 22757, "url": "http://www.tvmaze.com/people/22757/alan-tudyk", "name": "Alan Tudyk", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1971-03-16", "deathday": null, "gender": "Male", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/4/10099.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/4/10099.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/22757" } } }, "character": { "id": 49341, "url": "http://www.tvmaze.com/characters/49341/firefly-hoban-wash-washburne", "name": "Hoban \"Wash\" Washburne", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2602.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2602.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49341" } } }, "self": false, "voice": false }, { "person": { "id": 890, "url": "http://www.tvmaze.com/people/890/morena-baccarin", "name": "Morena Baccarin", "country": { "name": "Brazil", "code": "BR", "timezone": "America/Noronha" }, "birthday": "1979-06-02", "deathday": null, "gender": "Female", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/44/112177.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/44/112177.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/890" } } }, "character": { "id": 49342, "url": "http://www.tvmaze.com/characters/49342/firefly-inara-serra", "name": "Inara Serra", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2603.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2603.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49342" } } }, "self": false, "voice": false }, { "person": { "id": 4862, "url": "http://www.tvmaze.com/people/4862/adam-baldwin", "name": "Adam Baldwin", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1962-02-27", "deathday": null, "gender": "Male", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/3/8166.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/3/8166.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/4862" } } }, "character": { "id": 49343, "url": "http://www.tvmaze.com/characters/49343/firefly-jayne-cobb", "name": "Jayne Cobb", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2605.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2605.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49343" } } }, "self": false, "voice": false }, { "person": { "id": 4279, "url": "http://www.tvmaze.com/people/4279/jewel-staite", "name": "Jewel Staite", "country": { "name": "Canada", "code": "CA", "timezone": "America/Halifax" }, "birthday": "1982-06-02", "deathday": null, "gender": "Female", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/163/409273.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/163/409273.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/4279" } } }, "character": { "id": 49344, "url": "http://www.tvmaze.com/characters/49344/firefly-kaywinnet-lee-kaylee-frye", "name": "Kaywinnet Lee \"Kaylee\" Frye", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2606.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2606.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49344" } } }, "self": false, "voice": false }, { "person": { "id": 585, "url": "http://www.tvmaze.com/people/585/sean-maher", "name": "Sean Maher", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1975-04-16", "deathday": null, "gender": "Male", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/182/456947.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/182/456947.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/585" } } }, "character": { "id": 49345, "url": "http://www.tvmaze.com/characters/49345/firefly-dr-simon-tam", "name": "Dr. Simon Tam", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2609.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2609.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49345" } } }, "self": false, "voice": false }, { "person": { "id": 513, "url": "http://www.tvmaze.com/people/513/summer-glau", "name": "Summer Glau", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1981-07-24", "deathday": null, "gender": "Female", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/3/7754.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/3/7754.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/513" } } }, "character": { "id": 49346, "url": "http://www.tvmaze.com/characters/49346/firefly-river-tam", "name": "River Tam", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2608.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2608.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49346" } } }, "self": false, "voice": false }, { "person": { "id": 6101, "url": "http://www.tvmaze.com/people/6101/ron-glass", "name": "Ron Glass", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" }, "birthday": "1945-07-10", "deathday": "2016-11-25", "gender": "Male", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/2/6399.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/2/6399.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/people/6101" } } }, "character": { "id": 49347, "url": "http://www.tvmaze.com/characters/49347/firefly-derrial-book", "name": "Derrial Book", "image": { "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/2610.jpg", "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/2610.jpg" }, "_links": { "self": { "href": "http://api.tvmaze.com/characters/49347" } } }, "self": false, "voice": false }] }
    }
    spyOn(showDetailsService, 'getTvShowsInformation').withArgs(component.selectedShowId).and.returnValue(of(response));
    component.loadShowsData();
    expect(component.showDetailsData).toEqual(response);
  }));

  it('should call loadShowsSeasons and return list of seasonsDetailsData', fakeAsync(() => {
    component.selectedShowId = 10;
    const response: any =
      [
        {
          "id": 800,
          "url": "http://www.tvmaze.com/seasons/800/firefly-season-1",
          "number": 1,
          "name": "",
          "episodeOrder": 14,
          "premiereDate": "2002-09-20",
          "endDate": "2002-12-20",
          "network": {
            "id": 4,
            "name": "FOX",
            "country": {
              "name": "United States",
              "code": "US",
              "timezone": "America/New_York"
            }
          },
          "webChannel": null,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/9/23969.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/9/23969.jpg"
          },
          "summary": "<p>Captain Malcolm 'Mal' Reynolds is a former galactic war veteran who is the captain of the transport ship \"Serenity\". Mal and his crew, ensign Zoe Alleyne Washburne; Zoe's husband, pilot Hoban 'Wash' Washburne; muscular mercenary Jayne Cobb; young mechanic Kaylee Frye; former Alliance medical officer Simon Tam; his disturbed teenage sister River (both on the run from the interplanetary government \"The Alliance\"); the beautiful courtesan Inara Serra; and preacher Shepherd Book do any jobs, legal or illegal, they can find as the Serenity crew travels across the outskirts of outer space.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/seasons/800"
            }
          }
        }
      ]
    spyOn(showDetailsService, 'getTvShowsSeasonsInfo').withArgs(component.selectedShowId).and.returnValue(of(response));
    component.loadShowsSeasons();
    expect(component.seasonsDetailsData).toEqual(response);
  }));

  it('should set summary value for summary key not found in response', () => {
    component.showDetailsData =
    {
      "id": 800,
      "url": "http://www.tvmaze.com/seasons/800/firefly-season-1",
      "number": 1,
      "name": "",
      "episodeOrder": 14,
      "premiereDate": "2002-09-20",
      "endDate": "2002-12-20",
      "network": {
        "id": 4,
        "name": "FOX",
        "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
        }
      },
      "webChannel": null,
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/9/23969.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/9/23969.jpg"
      },
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/seasons/800"
        }
      }
    }

    component.removeHTMLTagsFromSummary();
    expect(component.showDetailsData.summary.trim()).toEqual('Summary Is unavailable.');
  });
});
