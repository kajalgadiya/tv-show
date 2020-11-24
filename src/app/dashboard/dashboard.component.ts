import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private router: Router) { }

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
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    autoplay: false,
    responsive: { 0: { items: 1 }, 400: { items: 2 }, 740: { items: 3 }, 940: { items: 5 } },
    nav: true
  }

  ngOnInit(): void {
    this.getTvShowsData();
    this.loadData = false;
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
  searchShows(searchedKey): void {
    this.searchedTerm = searchedKey.target.value;
  }

  triggerSearch(): void {
    this.loadData = false;
    if (this.searchedTerm.trim() == null || this.searchedTerm.trim() == '' || this.searchedTerm == undefined) {
      this.isSearched = false;
      this.loadData = true;
    } else {
      this.dashboardService.searchTvShows(this.searchedTerm).subscribe(data => {
        this.searchedTermTvShows = data;
        this.isSearched = true;
        this.loadData = true;
      });
    }
  }

  showDetails(showId) {
    this.router.navigate([`shows/${showId}`]);
  }
}
