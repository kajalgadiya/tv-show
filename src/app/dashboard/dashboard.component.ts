import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private loaderService: LoaderService) { }

  tvShowsList: any = [];
  allGenreList: any = [];
  uniqueGenreList: any = [];
  selectedGenreTvShowsList: any = [];
  selectedGenre;
  loadData = false;
  searchedTerm;
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
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    nav: true
  }
  isShow: boolean;
  topPosToStartShowing = 100;

  ngOnInit(): void {
    this.getTvShowsData();
    this.dashboardService.getSearchedValue().subscribe(value => {
      this.searchedTerm = value;
      this.triggerSearch();
    });
  }

  getTvShowsData(): void {
    this.dashboardService.getTvShowsInformation().subscribe(data => {
      this.tvShowsList = data;
      this.getGenreInfo();
    });
  }

  getGenreInfo(): void {
    this.tvShowsList.forEach(element => {
      this.allGenreList = this.allGenreList.concat(element.genres);
    });
    this.removeDuplicateGenre();
  }

  removeDuplicateGenre(): void {
    this.uniqueGenreList = this.allGenreList.filter((item, index) => {
      return this.allGenreList.indexOf(item) === index;
    });
    this.uniqueGenreList.unshift('Popular Shows');
    this.genreSpecificTvShows();
  }

  genreSpecificTvShows(): void {
    this.uniqueGenreList.forEach(genre => {
      let genreSpecficShows = {
        genreValue: genre,
        genreData: []
      }
      if (genre !== 'Popular Shows') {
        genreSpecficShows.genreData = this.tvShowsList.filter(data => data.genres.includes(genre));
        genreSpecficShows.genreData = this.descendingRatingAverage(genreSpecficShows.genreData);
      } else {
        genreSpecficShows.genreData = this.tvShowsList;
        genreSpecficShows.genreData = this.descendingRatingAverage(genreSpecficShows.genreData);
      }
      this.selectedGenreTvShowsList.push(genreSpecficShows);
    });
    this.loadData = true;
  }

  descendingRatingAverage(data) {
    data.sort((value1, value2) => (value1.rating.average > value2.rating.average) ? 1 : -1);
    data = data.reverse();
    return data;
  }

  triggerSearch(): void {
    this.loadData = false;
    if (this.searchedTerm.trim() == null || this.searchedTerm.trim() == '' || this.searchedTerm == undefined) {
      this.isSearched = false;
      setTimeout(() => this.loadData = true, 500);
    } else {
      this.searchedResults();
    }
  }

  searchedResults() {
    this.dashboardService.searchTvShows(this.searchedTerm).subscribe(data => {
      this.searchedTermTvShows = data;
      this.isSearched = true;
      this.loadData = true;
    });
  }


  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
