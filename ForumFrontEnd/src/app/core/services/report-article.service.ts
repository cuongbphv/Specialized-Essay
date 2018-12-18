import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {CustomToastrService} from './custom-toastr.service';

@Injectable()
export class ReportArticleService {

  constructor(
    private apiService: ApiService,
    private toastrService: CustomToastrService
  ) {
  }

  report(reportObj: any): Observable<any> {
    return this.apiService.post(API.ADD_INTERACT, {
      articleId: reportObj.articleId,
      userId: reportObj.userId,
      reason: reportObj.reason
    }).pipe(map(res => {
      if(res.status === 200) {
        this.toastrService.showSuccessToastr('message.report.success');
      }
      else {
        this.toastrService.showErrorToastr('api.status.' + res.status);
      }
    }));
  }

}
