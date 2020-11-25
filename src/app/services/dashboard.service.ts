import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private searchedKey = new Subject<any>();
  private showHideSearchBtn = new Subject<any>();

  constructor(private httpClient: HttpClient, private globalService: GlobalService) { }

  // get Tv Shows Data Information
  getTvShowsInformation(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows`);
  }

  searchTvShows(searchedTerm): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}search/shows?q=${searchedTerm}`);
  }

  setSearchedValue(message: string) {
    this.searchedKey.next(message);
  }

  getSearchedValue(): Observable<any> {
    return this.searchedKey.asObservable();
  }

  setIsSearchedFlag(message: boolean) {
    this.showHideSearchBtn.next(message);
  }
  getIsSearchedFlag(): Observable<any> {
    return this.showHideSearchBtn.asObservable();
  }
}
