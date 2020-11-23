import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor() { }

  serverUrl = 'http://api.tvmaze.com/';

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }
}
