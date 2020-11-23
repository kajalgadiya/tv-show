import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { finalize } from "rxjs/operators";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return throwError(error);
      }));
  }
}
