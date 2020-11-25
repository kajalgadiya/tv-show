import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide();
      }
      ),
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['page-not-found']);
        return throwError(error);
      }));
  }
}
