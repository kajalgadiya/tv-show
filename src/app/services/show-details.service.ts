import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentUrl } from '../globals/global';

@Injectable({
  providedIn: 'root'
})

export class ShowDetailsService {

  constructor(private httpClient: HttpClient) { }
  globalService = environmentUrl;

  // get Tv Shows Information based on Tv Show Id
  getTvShowsInformation(showId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}?embed=cast`);
  }

  // get Tv Shows Seasons Infomation based on Show Id
  getTvShowsSeasonsInfo(showId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}/seasons`);
  }
}
