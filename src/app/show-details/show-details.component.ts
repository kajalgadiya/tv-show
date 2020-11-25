import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { LoaderService } from '../services/loader.service';
import { ShowDetailsService } from '../services/show-details.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetialsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showDetailsService: ShowDetailsService,
    private loaderService: LoaderService, private dashboardService: DashboardService) { }
  selectedShowId: number;
  showDetailsData: any;
  loader = true;
  castDetailsData;
  seasonsDetailsData;
  isShow: boolean;
  topPosToStartShowing = 100;

  ngOnInit() {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadShowsData();
    this.dashboardService.setIsSearchedFlag(true);
  }

  loadShowsData() {
    this.showDetailsService.getTvShowsInformation(this.selectedShowId).subscribe(data => {
      this.showDetailsData = data;
      this.castDetailsData = this.showDetailsData['_embedded']['cast'];
      this.removeHTMLTagsFromSummary();
      this.loadShowsSeasons();
    });
  }

  removeHTMLTagsFromSummary() {
    if (this.showDetailsData.summary != null && this.showDetailsData.summary != undefined) {
      this.showDetailsData.summary = this.showDetailsData.summary.replace(/(<([^>]+)>)/ig, '');
    }
  }

  loadShowsSeasons() {
    this.showDetailsService.getTvShowsSeasonsInfo(this.selectedShowId).subscribe(seasonsData => {
      this.seasonsDetailsData = seasonsData;
      this.loader = false;
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
