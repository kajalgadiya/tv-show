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
  disableNextClick: boolean = false;
  disablePrevClick: boolean = true;
  itemsPerPage = 8;
  totalPages;
  selectedGenreTvShowsList: any = [];
  selectedGenre;

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
    console.log(this.uniqueGenreList)
    this.totalPages = Math.ceil(this.uniqueGenreList.length / this.itemsPerPage);
    this.showGenreOnLoad();
  }

  genreNextClick() {
    this.currentPage = this.currentPage + 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.currentPage - 1;
      this.disableNextClick = true;
    } else if (this.currentPage == 1 && this.totalPages == 1) {
      this.disableNextClick = true;
    } else {
      this.disableNextClick = false;
    }
  }

  genrePreviousClick() {
    this.currentPage = this.currentPage - 1;
    if (this.currentPage < this.totalPages) {
      this.currentPage = 1;
      this.disablePrevClick = true;
    } else if (this.currentPage == 1 && this.totalPages == 1) {
      this.disablePrevClick = true;
    } else {
      this.disablePrevClick = false;
    }
  }

  showGenreOnLoad() {
    this.selectedGenre = this.uniqueGenreList[0];
    this.genreSpecificTvShows();
  }

  selectedGenreBtn(genre) {
    this.selectedGenre = genre;
    this.genreSpecificTvShows();
  }

  genreSpecificTvShows() {
    this.selectedGenreTvShowsList = this.tvShowsList.filter(data => data.genres.includes(this.selectedGenre));
    this.selectedGenreTvShowsList.sort((a, b) => (a.rating.average > b.rating.average) ? 1 : -1)
    this.selectedGenreTvShowsList = this.selectedGenreTvShowsList.reverse();
    console.log(this.selectedGenreTvShowsList,)
  }
}
