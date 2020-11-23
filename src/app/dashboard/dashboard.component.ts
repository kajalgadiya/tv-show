import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  currentGenrePage = 1;
  tvShowsList: any = [];
  allGenreList: any = [];
  uniqueGenreList: any = [];
  itemsPerPageGenre = 6;
  totalPages;
  selectedGenreTvShowsList: any = [];
  selectedGenre;
  searchedTerm;
  searchedTermTvShows: any = [];
  isSearched = false;
  showsPerPage = 5;
  currentShowPageValue = 1;
  totalShowsCount;

  ngOnInit(): void {
    this.getTvShowsData();
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
    this.uniqueGenreList.unshift('All Genre');
    this.totalPages = Math.ceil(this.uniqueGenreList.length / this.itemsPerPageGenre);
    this.showGenreOnLoad();
  }

  genreNextClick(): void {
    if (this.currentGenrePage < this.totalPages) {
      this.currentGenrePage = this.currentGenrePage + 1;
    }
    this.currentShowPageValue = 1;
    const nextGenreIndex = (this.currentGenrePage * this.itemsPerPageGenre) - this.itemsPerPageGenre;
    this.selectedGenre = this.uniqueGenreList[nextGenreIndex];
    this.loadGenreData();
  }

  nextShows(): void {
    if (this.currentShowPageValue < this.totalShowsCount) {
      this.currentShowPageValue = this.currentShowPageValue + 1;
    }
  }

  genrePreviousClick(): void {
    if (this.currentGenrePage > 1) {
      this.currentGenrePage = this.currentGenrePage - 1;
    }
    this.currentShowPageValue = 1;
    const prevGenreIndex = (this.currentGenrePage * this.itemsPerPageGenre) - this.itemsPerPageGenre;
    this.selectedGenre = this.uniqueGenreList[prevGenreIndex];
    this.loadGenreData();
  }

  prevShows(): void {
    if (this.currentShowPageValue > 1) {
      this.currentShowPageValue = this.currentShowPageValue - 1;
    }
  }

  showGenreOnLoad(): void {
    this.selectedGenre = this.uniqueGenreList[0];
    this.loadGenreData();
  }

  selectedGenreBtn(genre): void {
    this.selectedGenre = genre;
    this.loadGenreData();
  }

  loadGenreData(): void {
    this.genreSpecificTvShows();
    this.isSearched = false;
    this.searchedTerm = '';
  }

  genreSpecificTvShows(): void {
    this.currentShowPageValue = 1;
    if (this.selectedGenre !== 'All Genre') {
      this.selectedGenreTvShowsList = this.tvShowsList.filter(data => data.genres.includes(this.selectedGenre));
    } else {
      this.selectedGenreTvShowsList = this.tvShowsList;
    }
    this.selectedGenreTvShowsList.sort((a, b) => (a.rating.average > b.rating.average) ? 1 : -1);
    this.selectedGenreTvShowsList = this.selectedGenreTvShowsList.reverse();
    this.totalShowsCount = Math.ceil(this.selectedGenreTvShowsList.length / this.showsPerPage);
  }

  searchShows(searchedKey): void {
    this.searchedTerm = searchedKey.target.value;
  }

  search(): void {
    this.currentShowPageValue = 1;
    this.dashboardService.searchTvShows(this.searchedTerm).subscribe(data => {
      this.searchedTermTvShows = data;
      this.selectedGenre = 'All Genre';
      this.isSearched = true;
    });
    this.totalShowsCount = Math.ceil(this.searchedTermTvShows.length / this.showsPerPage);
  }
}
