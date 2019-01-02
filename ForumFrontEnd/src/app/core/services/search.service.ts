import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {CustomToastrService} from './custom-toastr.service';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(
    private apiService: ApiService
  ) {
  }

  searchTop(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.TOP_RESULT_SEARCH, {
      type: pagingRequest.type,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    }).pipe(map(res => {
      if(res.status === 200) {
        return res.data;
      }
      return null;
    }));
  }

  searchByType(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.SEARCH_BY_TYPE, {
      type: pagingRequest.type,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    }).pipe(map(res => {
      if(res.status === 200) {
        return res.data;
      }
      return null;
    }));
  }

}
