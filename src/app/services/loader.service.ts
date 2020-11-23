import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  isLoading = new Subject<boolean>();

  show(): any {
    this.isLoading.next(true);
  }

  hide(): any {
    this.isLoading.next(false);
  }
}
