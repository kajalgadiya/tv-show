import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetialsComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  ngOnInit() { }
}
