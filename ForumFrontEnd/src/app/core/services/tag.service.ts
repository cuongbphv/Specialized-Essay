import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable()
export class TagService {

  constructor(
    private apiService: ApiService
  ) {
  }

  getMostTagInForum(): Observable<any> {
    return this.apiService.get(API.GET_MOST_TAG_IN_FORUM)
      .pipe(map(res => res.data));
  }

}
