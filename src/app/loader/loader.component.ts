import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.css'],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) { }
  isLoading: Subject<boolean> = this.loaderService.isLoading;

}
