import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {CustomToastrService} from './custom-toastr.service';

@Injectable()
export class TagService {

  constructor(
    private apiService: ApiService,
    private toastrService: CustomToastrService
  ) {
  }

  getMostTagInForum(): Observable<any> {
    return this.apiService.get(API.GET_MOST_TAG_IN_FORUM)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getMyTags(userId: string): Observable<any> {
    return this.apiService.get(API.MY_TAGS + "?user_id=" + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

}
