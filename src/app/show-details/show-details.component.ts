import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { ShowDetailsService } from '../services/show-details.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetialsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showDetailsService: ShowDetailsService) { }
  selectedShowId: number;
  showDetailsData: any;
  loader = true;
  castDetailsData;
  seasonsDetailsData;

  ngOnInit(): void {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadShowsData();
  }

  // loads shows info based on show id
  loadShowsData(): void {
    this.showDetailsService.getTvShowsInformation(this.selectedShowId).subscribe(data => {
      this.showDetailsData = data;
      this.castDetailsData = this.showDetailsData._embedded.cast;
      this.removeSemanticTagsFromSummary();
      this.loadShowsSeasons();
    });
  }

  // remove HTML Tags from summary information
  removeSemanticTagsFromSummary(): void {
    if (this.showDetailsData.summary !== null && this.showDetailsData.summary !== undefined) {
      this.showDetailsData.summary = this.showDetailsData.summary.replace(/(<([^>]+)>)/ig, '');
    } else {
      this.showDetailsData.summary = 'Summary Is unavailable.';
    }
  }

  // loads seasons Information of shows based on show id
  loadShowsSeasons(): void {
    this.showDetailsService.getTvShowsSeasonsInfo(this.selectedShowId).subscribe(seasonsData => {
      this.seasonsDetailsData = seasonsData;
      this.loader = false;
    });
  }
}
