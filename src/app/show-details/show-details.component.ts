import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  ngOnInit() {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadShowsData();
    this.loadShowsSeasons();
  }

  loadShowsData() {
    this.showDetailsService.getTvShowsInformation(this.selectedShowId).subscribe(data => {
      this.showDetailsData = data;
      this.castDetailsData = this.showDetailsData['_embedded']['cast'];
    });
  }

  loadShowsSeasons() {
    this.showDetailsService.getTvShowsSeasonsInfo(this.selectedShowId).subscribe(seasonsData => {
      this.seasonsDetailsData = seasonsData;
      this.loader = false;
    });
  }

  seasonsNavigation(seasonsData) {
    window.open(seasonsData['url'], '_blank');
  }
}
