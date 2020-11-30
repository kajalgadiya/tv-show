import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  tvShowsList: any = [];
  allGenreList: any = [];
  uniqueGenreList: any = [];
  selectedGenreTvShowsList: any = [];
  selectedGenre: any;
  loadData = false;
  searchedTerm: string;
  searchedTermTvShows: any = [];
  isSearched = false;
  customOptions: OwlOptions = {
    items: 6,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 500,
    dots: false,
    navText: [`<i class='fa fa-chevron-left'></i>`, `<i class='fa fa-chevron-right'></i>`],
    nav: true
  };

  ngOnInit(): void {
    this.dashboardService.getSearchedValue().subscribe(value => {
      this.searchedTerm = value;
      this.triggerSearch();
    });
    this.fetchTvShowsList();
  }

  // get list of all tv shows fetched
  fetchTvShowsList(): void {
    this.dashboardService.getTvShowsInformation().subscribe(data => {
      this.tvShowsList = data;
      this.generateGenreInfoList();
    });
  }

  // create list of all genres available in tvShowsList
  generateGenreInfoList(): void {
    this.tvShowsList.forEach((element: { genres: any; }) => {
      this.allGenreList = [...this.allGenreList, ...element.genres];
    });
    this.removeDuplicateGenre();
  }

  // remove all duplicate genres
  removeDuplicateGenre(): void {
    this.uniqueGenreList = ['Popular Shows', ...new Set(this.allGenreList)];
    this.genreSpecificTvShows();
  }

  // cretae genre and respective genre data dynamically
  genreSpecificTvShows(): void {
    this.uniqueGenreList.forEach((genre: string) => {
      const genreSpecficShows = {
        genreValue: genre,
        genreData: []
      };
      if (genre !== 'Popular Shows') {
        genreSpecficShows.genreData = this.tvShowsList.filter((data: { genres: string | any[]; }) => data.genres.includes(genre));
        genreSpecficShows.genreData = this.descendingRatingAverage(genreSpecficShows.genreData);
      } else {
        genreSpecficShows.genreData = this.tvShowsList;
        genreSpecficShows.genreData = this.descendingRatingAverage(genreSpecficShows.genreData);
      }
      this.selectedGenreTvShowsList.push(genreSpecficShows);
    });
    this.loadData = true;
  }

  // sort genre data based on average rating in descending order
  descendingRatingAverage(data: any[]): any {
    data.sort((value1: { rating: { average: number; }; }, value2: { rating: { average: number; }; }) => (value1.rating.average > value2.rating.average) ? 1 : -1);
    data = data.reverse();
    return data;
  }

  // identifies if search api needs to be called or not
  triggerSearch(): void {
    this.loadData = false;
    if (this.searchedTerm.trim() === null || this.searchedTerm.trim() === '' || this.searchedTerm === undefined) {
      this.isSearched = false;
      setTimeout(() => this.loadData = true, 500);
    } else {
      this.searchedResults();
    }
  }

  // get searched results based on search value
  searchedResults(): void {
    this.dashboardService.searchTvShows(this.searchedTerm).subscribe(data => {
      this.searchedTermTvShows = data;
      this.isSearched = true;
      this.loadData = true;
    });
  }
}
