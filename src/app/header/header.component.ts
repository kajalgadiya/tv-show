import { Component, HostListener, OnInit } from '@angular/core';
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
  isShow: boolean;
  topPosToStartShowing = 100;
  scrollPosition;

  ngOnInit(): void {
    this.showHideSearch();
    this.dashboardService.getIsSearchedFlag().subscribe(data => {
      this.hideSearch = true;
    });
  }

  // show/hide toggler based on device width
  openCloseDiv(): void {
    let collapsibleDiv = document.getElementById('navbarTogglerId');
    if (collapsibleDiv.classList.contains('collapse')) {
      collapsibleDiv.classList.remove("collapse");
      collapsibleDiv.classList.add("collapsed");
    } else {
      collapsibleDiv.classList.add("collapse");
      collapsibleDiv.classList.remove("collapsed");
    }
  }

  // fetch searched value from input box
  valueSearched(event): void {
    this.searchedTerm = event.target.value;
    if (event.keyCode === 13) { this.search(); }
  }

  // set the searched key value to be fetched in dashboard page
  search(): void {
    let pathName = window.location.pathname;
    if (pathName.includes('shows')) {
      this.hideSearch = true;
    } else {
      this.dashboardService.setSearchedValue(this.searchedTerm);
      this.hideSearch = false;
    }
  }

  // show/hide search based on routes 
  showHideSearch(): void {
    this.searchedTerm = '';
    this.search();
  }

  // detects window scroll
  // show hide top button on scroll position
  @HostListener('window:scroll')
  checkScroll(): void {
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (this.scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // it should scroll page to the top
  gotoTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
