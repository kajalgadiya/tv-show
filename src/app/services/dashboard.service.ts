import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environmentUrl } from '../globals/global';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  searchedKey = new Subject<any>();
  showHideSearchBtn = new Subject<any>();
  globalService = environmentUrl;

  constructor(private httpClient: HttpClient) { }

  // get Tv Shows Data Information
  getTvShowsInformation(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows`);
  }

  // get searched TV Show information
  searchTvShows(searchedTerm): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}search/shows?q=${searchedTerm}`);
  }

  // set the searched value
  setSearchedValue(message: string): any {
    this.searchedKey.next(message);
  }

  // get the searched value
  getSearchedValue(): Observable<any> {
    return this.searchedKey.asObservable();
  }
}
