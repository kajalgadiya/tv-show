import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ShowDetailsService } from '../services/show-details.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetialsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showDetailsService: ShowDetailsService,
    private loaderService: LoaderService) { }
  selectedShowId: number;
  showDetailsData: any;
  loader = true;
  castDetailsData;
  seasonsDetailsData;

  ngOnInit() {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadShowsData();
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
      this.loaderService.hide();
      this.loader = false;
    });
  }
}
