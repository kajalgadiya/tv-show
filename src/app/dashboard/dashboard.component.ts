import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  currentPage = 1;
  tvShowsList: any = [];
  allGenreList: any = [];
  uniqueGenreList: any = [];
  itemsPerPage = 6;
  totalPages;
  selectedGenreTvShowsList: any = [];
  selectedGenre;
  searchedTerm;
  searchedTermTvShows: any = [];
  isSearched: boolean = false;
  showsPerPage = 4;
  currentShowPageValue = 1;
  totalShowsCount;

  ngOnInit(): void {
    this.getTvShowsData();
  }

  getTvShowsData() {
    this.dashboardService.getTvShowsInformation().subscribe(data => {
      this.tvShowsList = data;
      this.getGenreInfo();
    });
  }

  getGenreInfo() {
    this.tvShowsList.forEach(element => {
      this.allGenreList = this.allGenreList.concat(element.genres);
    });
    this.removeDuplicateGenre();
  }

  removeDuplicateGenre() {
    this.uniqueGenreList = this.allGenreList.filter((item, index) => {
      return this.allGenreList.indexOf(item) === index;
    });
    this.uniqueGenreList.unshift('All Genre');
    this.totalPages = Math.ceil(this.uniqueGenreList.length / this.itemsPerPage);
    this.showGenreOnLoad();
  }

  genreNextClick() {
    this.currentPage = this.currentPage + 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.currentPage - 1;
    }
    const nextGenreIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
    this.selectedGenre = this.uniqueGenreList[nextGenreIndex];
    this.loadGenreData();
  }

  nextShows() {
    this.currentShowPageValue = this.currentShowPageValue + 1;
    if (this.currentShowPageValue > this.totalShowsCount) {
      this.currentShowPageValue = this.currentPage - 1;
    }
  }

  genrePreviousClick() {
    this.currentPage = this.currentPage - 1;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    const prevGenreIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
    this.selectedGenre = this.uniqueGenreList[prevGenreIndex];
    this.loadGenreData();
  }

  prevShows() {
    this.currentShowPageValue = this.currentShowPageValue - 1;
    if (this.currentShowPageValue < 1) {
      this.currentShowPageValue = 1;
    }
  }

  showGenreOnLoad() {
    this.selectedGenre = this.uniqueGenreList[0];
    this.loadGenreData();
  }

  selectedGenreBtn(genre) {
    this.selectedGenre = genre;
    this.loadGenreData();
  }

  loadGenreData() {
    this.genreSpecificTvShows();
    this.isSearched = false;
    this.searchedTerm = '';
  }
  genreSpecificTvShows() {
    if (this.selectedGenre != 'All Genre') {
      this.selectedGenreTvShowsList = this.tvShowsList.filter(data => data.genres.includes(this.selectedGenre));
    } else {
      this.selectedGenreTvShowsList = this.tvShowsList;
    }
    this.selectedGenreTvShowsList.sort((a, b) => (a.rating.average > b.rating.average) ? 1 : -1)
    this.selectedGenreTvShowsList = this.selectedGenreTvShowsList.reverse();
    this.totalShowsCount = Math.ceil(this.selectedGenreTvShowsList.length / this.showsPerPage);
  }

  searchShows(searchedKey) {
    this.searchedTerm = searchedKey.target.value;
  }

  search() {
    this.dashboardService.searchTvShows(this.searchedTerm).subscribe(data => {
      this.searchedTermTvShows = data;
      this.selectedGenre = 'All Genre';
      this.isSearched = true;
    })
  }
}
