import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class ShowDetailsService {

  constructor(private httpClient: HttpClient, private globalService: GlobalService) { }

  // get Tv Shows Information based on Tv Show Id
  getTvShowsInformation(showId): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}?embed=cast`);
  }

  // get Tv Shows Seasons Infomation based on Show Id
  getTvShowsSeasonsInfo(showId): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}/seasons`);
  }
}
