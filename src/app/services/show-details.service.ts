import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class ShowDetailsService {

  constructor(private httpClient: HttpClient, private globalService: GlobalService) { }

  // get Tv Shows Information based on Tv Show Id
  getTvShowsInformation(showId): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}?embed=cast`)
      .pipe(
        catchError(this.globalService.handleError));
  }

  getTvShowsSeasonsInfo(showId): Observable<any> {
    return this.httpClient.get<any[]>(`${this.globalService.serverUrl}shows/${showId}/seasons`)
      .pipe(
        catchError(this.globalService.handleError));
  }
}
