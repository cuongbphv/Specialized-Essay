import {Observable, Observer} from '../../../node_modules/rxjs';

export class SharedService {
  data: any;
  dataChange: Observable<any>;
  dataChangeObserver: Observer<any>;

  constructor() {
    this.dataChange = new Observable((observer:Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  setData(data:any) {
    this.data = data;
    this.dataChangeObserver.next(this.data);
  }
}
