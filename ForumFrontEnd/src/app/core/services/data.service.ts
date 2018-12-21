import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  data: any;
  dataChange: Observable<any>;
  dataChangeObserver: Observer<any>;

  constructor() {
    this.dataChange = new Observable((observer: Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  setData(data: any) {
    this.data = data;
    this.dataChangeObserver.next(this.data);
  }
}
