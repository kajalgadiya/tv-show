import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dashboardService: DashboardService,) { }
  title = 'TV Maze';
  searchedTerm = '';
  hideSearch = false;
  ngOnInit(): void {
    this.showHideSearch();
    this.dashboardService.getIsSearchedFlag().subscribe(data => {
      this.hideSearch = true;
    })
  }

  openCloseDiv() {
    let collapsibleDiv = document.getElementById('navbarTogglerId');
    if (collapsibleDiv.classList.contains('collapse')) {
      collapsibleDiv.classList.remove("collapse");
      collapsibleDiv.classList.add("collapsed");
    } else {
      collapsibleDiv.classList.add("collapse");
      collapsibleDiv.classList.remove("collapsed");
    }
  }

  valueSearched(event) {
    this.searchedTerm = event.target.value;
    // this.search();
  }

  setSearchValue(){
    this.searchedTerm = '';
    this.search()
  }

  search() {
    let pathName = window.location.pathname;
    if (pathName.includes('shows')) {
      this.hideSearch = true;
    } else {
      this.dashboardService.setSearchedValue(this.searchedTerm);
      this.hideSearch = false;
      
    }
  }

  showHideSearch() {
    this.searchedTerm = '';
    let pathName = window.location.pathname;
    if (pathName.includes('shows')) {
      this.hideSearch = true;
    } else {
      this.hideSearch = false;
    }
  }
}
