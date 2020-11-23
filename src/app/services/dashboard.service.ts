import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private httpClient: HttpClient, private globalService: GlobalService) { }

  // get Tv Shows Data Information
  getTvShowsInformation(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows`)
      .pipe(
        catchError(this.globalService.handleError));
  }

  searchTvShows(searchedTerm): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}search/shows?q=${searchedTerm}`)
      .pipe(
        catchError(this.globalService.handleError));
  }
}