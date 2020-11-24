import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  title = 'TV Maze';
  ngOnInit(): void {
  }

  openCloseDiv() {
    let collapsibleDiv = document.getElementById('navbarTogglerDemo01');
    if (collapsibleDiv.classList.contains('collapse')) {
      collapsibleDiv.classList.remove("collapse");
      collapsibleDiv.classList.add("collapsed");
    } else {
      collapsibleDiv.classList.add("collapse");
      collapsibleDiv.classList.remove("collapsed");
    }
  }
}
