import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private router: Router) { }
  title = 'TV Maze';
  searchedTerm = '';
  showScrollTopBtn: boolean;
  topPositionToShowScrollBtn = 100;
  scrollPosition;

  ngOnInit(): void {
  }

  // show/hide toggler based on device width
  openCloseDiv(): void {
    const collapsibleDiv = document.getElementById('navbarTogglerId');
    if (collapsibleDiv.classList.contains('collapse')) {
      collapsibleDiv.classList.remove('collapse');
      collapsibleDiv.classList.add('collapsed');
    } else {
      collapsibleDiv.classList.add('collapse');
      collapsibleDiv.classList.remove('collapsed');
    }
  }

  // fetch searched value from input box
  valueSearched(event: { target: { value: string; }; keyCode: number; }): void {
    this.searchedTerm = event.target.value;
    if (event.keyCode === 13) { this.search(); }
  }

  // set the searched key value to be fetched in dashboard page
  search(): void {
    const pathName = window.location.pathname;
    if (pathName === '/') {
      this.dashboardService.setSearchedValue(this.searchedTerm);
    } else {
      this.router.navigate(['']);
      setTimeout(() => this.dashboardService.setSearchedValue(this.searchedTerm), 100);
    }
  }
  // show/hide search based on routes
  emptySearchedTerm(): void {
    this.searchedTerm = '';
    this.search();
  }

  // detects window scroll
  // show hide top button on scroll position
  @HostListener('window:scroll')
  checkScroll(): void {
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (this.scrollPosition >= this.topPositionToShowScrollBtn) {
      this.showScrollTopBtn = true;
    } else {
      this.showScrollTopBtn = false;
    }
  }

  // it should scroll page to the top
  gotoTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
